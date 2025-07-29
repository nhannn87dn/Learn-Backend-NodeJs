import express from "express";
import Test from "../../models/Test.model";
import Product from "../../models/Product.model";
// import { faker } from '@faker-js/faker';

const router = express.Router();

// Test route
router.get("/test", async (req, res) => {
  //1. Create a new test document
  // await Test.create({
  //   firstName: "John",
  //   lastName: "Doe",
  //   age: 30
  // })
  // const newRecord = new Test({
  //   firstName: "Jane", 
  //   lastName: "Doe",
  //   age: 25
  // });
  // await newRecord.save();
  //2 Insert multiple test documents
  // await Test.insertMany([
  //   { firstName: "Alice", lastName: "Smith", age: 28, phone: "1234557890" },
  //   { firstName: "Bob", lastName: "Johnson", age: 32, phone: "0987654455" },
  //   { firstName: "Charlie", lastName: "Brown", age: 22, phone: "1122334455" },
  // ]);

  //II. Delete
   
   //2.1 Xóa theo ID
   // DELETE FROM TEST wHERE _id = "6878e28875e83bf14de76498"
   //await Test.findByIdAndDelete("6878e28875e83bf14de76498");
  //2.2 Xóa theo điều kiện khác
  /// DELETE FROM TEST WHERE firstName = "Alice"
  //await Test.findOneAndDelete({ firstName: 'Alice' });

  //III. Update
  //3.1 Cập nhật theo ID
  // await Test.findByIdAndUpdate("6878e28875e83bf14de76497", {
  //   firstName: "Updated Name"
  // });
  //3.2 Cập nhật theo điều kiện khác
  // await Test.findOneAndUpdate({ lastName: 'Johnson' }, {
  //   age: 36,
  //   firstName: "Updated Bob"
  // }, 
  // );

  //IV. Find
  //4.1 Tìm tất cả - SELECT * FROM Product
  // const products = await Product
  // .find();
  //4.2 Select một số trường
  // const products = await Product
  // .find()
  // .select("product_name price");

   //4.3 Lấy tất cả nhưng loại trừ một số trường
  // const products = await Product
  // .find()
  // .select("-updatedAt -createdAt");
  //4.4 Tìm và sắp xếp
  //  const products = await Product
  // .find()
  // .select("-updatedAt -createdAt")
  // .sort({ product_name: 1, price: -1 }); // Sắp xếp theo giá giảm dần
  //4.5 Tìm với điều kiện
  //  const products = await Product
  // .find({
  //   //model_year: 1934
  //   stock: { $gte: 10 } // Tìm sản phẩm có số lượng tồn kho lớn hơn hoặc bằng 10
  // })
  // .select("-updatedAt -createdAt")

  //4.6 Toán tử and
  //  const products = await Product
  // .find({
  //   $and: [
  //     { stock: { $gte: 10 } }, // Số lượng tồn kho lớn hơn hoặc bằng 10
  //     { price: { $gte: 900 } } // Giá nhỏ hơn hoặc bằng 100
  //   ]

  // })
  // .select("-updatedAt -createdAt")

  //4.7 Tìm với toán tử like
  // const products = await Product
  // .find({
  //   product_name: { $regex: "Bike5", $options: "i" } // Tìm sản phẩm có tên chứa "iPhone")
  // })
  // .select("-updatedAt -createdAt")

  // const products = await Test
  // .find({
  //   phone: { $regex: '^\\d{3}455\\d{4}$', $options: "i" } // Tìm sản phẩm có tên chứa "iPhone")
  // })
  //4.8 Tìm và phân trang

  // const currentPage = 3;
  // const pageSize = 5; // Số lượng bản ghi trên mỗi trang
  // const products = await Product
  // .find()
  // .skip((currentPage - 1) * pageSize) // Bỏ qua 0 bản ghi
  // .limit(pageSize) // Giới hạn 10 bản ghi

  //4.9 Tìm với populate (JOIN)
  const products = await Product
    .find()
    .populate("category_id", "category_name") // Chỉ lấy trường name từ Category
    .populate("brand_id", "brand_name") // Chỉ lấy trường name từ Brand
    .select("-updatedAt -createdAt");
    /*
  SELECT p.*, c.category_name, b.*
  FROM Product p
  JOIN Category c ON p.category_id = c._id
  JOIN Brand b ON p.brand_id = b._id
    */

  res.json({ message: "Test route is working!", products });
});
export default router;
