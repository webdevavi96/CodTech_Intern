import jwt from 'jsonwebtoken';

const isProduction = process.env.NODE_ENV === 'production';

export const authJwt = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: 'No access token' });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

      req.user = decoded;
      return next();
    } catch (err) {

      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token' });
      }

      let decodedRefresh;

      try {
        decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
      } catch (refreshErr) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }
      const newAccessToken = jwt.sign({ _id: decodedRefresh._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15m',
      });

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'None' : 'Lax',
      });

      req.user = decodedRefresh;
      return next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
