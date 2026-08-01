import { ENV } from "../config/env";
import mongoose from 'mongoose';
import Product from "../models/product.model";


//step 1: connect to mongodb
//kết nối mongodb qua mongoose
mongoose.connect(ENV.MONGODB_URI, {
  autoIndex: true, // Tự động tạo index từ schema
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Thoát ứng dụng nếu không kết nối được
});


// Function to create a new category
const runDB = async () => {
    try {

        // THỰC HÀNH CÁC LỆNH TRUY VẤN DỮ LIỆU MONGODB QUA MONGOOSE Ở ĐÂY
        //1. SELECT * FROM products
        // const products = await Product.find();
        // console.log('<<=== 🚀 products ===>>',products);

        //2 . SELECT product_name, price FROM products
        // const products = await Product
        // .find()
        // .select('product_name price'); // Chỉ lấy các trường product_name và price
        // console.log('<<=== 🚀 products ===>>',products);

        //3. Lất tất cả chỉ loại trừ 1 số trường cụ thể
        // const products = await Product
        // .find()
        // .select('-__v -createdAt -updatedAt'); // lọai trừ các trường __v, createdAt, updatedAt
        // console.log('<<=== 🚀 products ===>>',products);

        //4 SELCT với where điều kiện lọc dữ liệu
        //example: SELECT * FROM products WHERE model_year > 2008

        // const products = await Product
        // .find({
        //     model_year: { $gt: 2008 } // Lọc các sản phẩm có model_year lớn hơn 2008
        // })
        // .select('product_name price model_year')
        // .sort({ model_year: -1 }) // -1 là giảm dần, 1 là tăng dần
        // ; // Chỉ lấy các trường product_name và price
        // console.log('<<=== 🚀 products ===>>',products);


        //5. SELECT với toán tử OR
        // const products = await Product
        // .find({
        //     $or: [
        //         { model_year: 2010 }, 
        //         { model_year: 2024 } 
        //     ] // Lọc các sản phẩm có model_year = 2010 và 2024
        // })
        // .select('product_name price model_year')
        // .sort({ model_year: -1 }) // -1 là giảm dần, 1 là tăng dần
        // ; // Chỉ lấy các trường product_name và price
        // console.log('<<=== 🚀 products ===>>',products);


        //6. SELECT với toán tử AND
        // const products = await Product
        // .find({
        //     $and: [
        //         { discount: 43 }, 
        //         { model_year: {$gte: 2010} } 
        //     ] // Lọc các sản phẩm có model_year = 2010 và 2024
        // })
        // .select('product_name price model_year')
        // .sort({ model_year: -1 }) // -1 là giảm dần, 1 là tăng dần
        // ; // Chỉ lấy các trường product_name và price
        // console.log('<<=== 🚀 products ===>>',products);

        //UPDATE with mongoose
        // await Product.findByIdAndUpdate(
        //     '6a6dd84024d3bcd55ff21c92',
        //     {
        //         stock: 10
        //     },
        //     {
        //         returnDocument: 'after' // Trả về document sau khi cập nhật
        //     }

        // )

        //SELECT phân trang với mongoose
        const page = 1; // Trang hiện tại
        const limit = 5; // Số lượng sản phẩm trên mỗi trang
        const offset = (page - 1) * limit

        const products = await Product
        .find()
        .skip(offset) // Bỏ qua các sản phẩm của các trang trước
        .limit(limit) // Lấy số lượng sản phẩm theo limit
        .select('product_name price model_year')
        .sort({ model_year: -1 }) // -1 là giảm dần, 1 là tăng dần
        ;

        //SELECT với populate để lấy dữ liệu từ bảng liên quan
        /*
        SELECT p.product_name, p.price, p.model_year, c.category_name, b.brand_name FROM products p
        LEFT JOIN categories c ON p.category = c.id
        LEFT JOIN brands b ON p.brand = b.id

        */

        // const products = await Product
        // .find()
        // .populate('category', 'category_name') // Lấy dữ liệu từ bảng categories, chỉ lấy trường category_name
        // .populate('brand', 'brand_name') // Lấy dữ liệu từ bảng brands, chỉ lấy trường brand_name
        // .skip(offset) // Bỏ qua các sản phẩm của các trang trước
        // .limit(limit) // Lấy số lượng sản phẩm theo limit
        // .select('product_name price model_year')
        // .sort({ model_year: -1 }) // -1 là giảm dần, 1 là tăng dần
        // ;
        
        console.log('<<=== 🚀 products ===>>',products);

    } catch (error) {
        console.log('<<=== 🚀 error ===>>',error); 
    }
    finally {
        mongoose.connection.close(); // Đóng kết nối sau khi hoàn thành
         process.exit(1); // Thoát ứng dụng nếu không kết nối được
    }
}

runDB();