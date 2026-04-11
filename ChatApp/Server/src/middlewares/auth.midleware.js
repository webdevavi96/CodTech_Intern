import jwt from 'jsonwebtoken';

export const authJwt = (req, res, next) => {
  const token = req.headers['authorization']?.split('')[1];

  if (!token) return res.status(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403);

    req.user = user;
    next();
  });
};
