# Server File Structure

```
└── 📁Server
    └── 📁public
        └── 📁temp
            ├── .gitkeep
    └── 📁src
        └── 📁config
            ├── config.js
            ├── conn.db.js
            ├── nodemailer.js
            ├── redis.conf.js
        └── 📁controllers
            ├── Calls.controller.js
            ├── Message.controller.js
            ├── User.controller.js
        └── 📁middlewares
            ├── auth.midleware.js
            ├── multer.middleware.js
            ├── user.middleware.js
        └── 📁models
            ├── Calls.models.js
            ├── Messages.models.js
            ├── User.models.js
        └── 📁routes
            ├── auth.routes.js
            ├── calls.routes.js
            ├── chat.routes.js
        └── 📁utils
            ├── asyncHandler.js
            ├── OTPgenerator.js
    ├── .gitignore
    ├── .prettierignore
    ├── .prettierrc
    ├── app.js
    ├── .env.sample
    ├── constant.js
    ├── index.js
    ├── package-lock.json
    └── package.json
```
