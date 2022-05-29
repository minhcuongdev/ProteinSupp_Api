require('dotenv').config()

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,
    SECRET_KEY: process.env.SECRET_KEY,
    SECRET_JWT_TOKEN: process.env.SECRET_JWT_TOKEN,
    SECRET_REFRESH_JWT_TOKEN: process.env.SECRET_REFRESH_JWT_TOKEN,
    HOST: process.env.HOST,
    PORT: process.env.PORT
}