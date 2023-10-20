import dotenv from 'dotenv';
dotenv.config(); 
//==>Load lên tất cả các biến môi trường có trong .env
export default {
  PORT: process.env.PORT || 9000,

}