import dotenv from 'dotenv';
import app from './src/app'
dotenv.config();
//Khai báo port cho server
const PORT = process.env.PORT || 9000;


//Khởi tạo server ở PORT đã chỉ định ở trên
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});