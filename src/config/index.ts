import dotenv from 'dotenv';
dotenv.config();
export default {
    port:process.env.PORT||4000,
    db: process.env.MONGO_DB,
    allowedOrigins: ['http://localhost:3000', 'http://yourapp.com', 'http://localhost:4020']
};