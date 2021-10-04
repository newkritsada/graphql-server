import dotenv from 'dotenv'
dotenv.config()
export default {
  port: process.env.PORT || 4000,
  db: process.env.MONGO_DB,
  secretKey: process.env.SECRET_KEY||'1234',
  accessTokenExpired: process.env.ACCESS_tOKEN_EXPIRED || '0',
  refreshTokenExpired: process.env.REFRESH_tOKEN_EXPIRED || '0',
  allowedOrigins: ['http://localhost:3000', 'http://yourapp.com', 'http://localhost:4020'],
}
