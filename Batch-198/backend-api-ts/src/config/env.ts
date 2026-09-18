import dotenv from "dotenv";
dotenv.config();

//Mục đính file này là quản lý biến môi trường
// tập trung 1 chỗ.
export const ENV = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
}