import Category from "../models/category.model";
import mongoose from "mongoose";
import Brand from "../models/brand.model";
import Product from "../models/product.model";

// Kết nối MongoDB
const connectionString: string = "mongodb://localhost:27017/Batch188";
mongoose
  .connect(connectionString, {
    dbName: "Batch188", //Database name
    maxPoolSize: 100, //Max pool size
    //socketTimeoutMS: 60, //Socket timeout
  })
  .then(() => {
    console.log("Connected to MongoDB");
    //Ket noi thanh cong ==> moi di listen express server
    
  })
  .catch((error) => console.error("MongoDB connection error:", error));

const runDB = async()=>{
    //th1. Lay tat ca san pham: Model.find() = SELECT * FROM product
    // const products = await Product.find();
    // console.log('<<=== products ===>>', products);
    //th 2: Tim 1 sp dua vao id = Model.findById(id) = SELECT * FROM product WHERE id = id
    // const products = await Product.findById('671a3d9a33ed0877177b1d0a');
    // console.log('<<=== products ===>>', products);
    //th3: Tim va xoa dua vao id
    // const result = await Product.findByIdAndDelete('671a3d9a33ed0877177b1cfc');
    // console.log('<<=== result ===>>', result);
    //th4: Tim va update by Id
    // const result = await Product.findByIdAndUpdate('671a3d9a33ed0877177b1d0a', {
    //     product_name: 'Pfeffer, Pfeffer and Price49 v2',
    //     price: 837
    // });
    // console.log('<<=== result ===>>', result);

    //th 5: Tim 1 dua vao mot hoac nhieu truong cu the
    // const result = await Product.findOne({
    //     discount: 18
    // });
    // console.log('<<=== result ===>>', result);
     // SELECT TOP 1 * FROM product WHERE discount = 18 AND model_year = 2838

    //th6: Tim all sp co discount = 18
    //  const result = await Product.find({
    //     discount: 18,
    //     model_year: 2838,
    // });
    // SELECT * FROM product WHERE discount = 18 AND model_year = 2838
    //console.log('<<=== result ===>>', result);

    //th 7: Tim sp co model_year = 2838 hoac 2607

    // const result = await Product.find({
    //     $or: [
    //         { model_year: 2838 },
    //         { model_year: 2607 }
    //     ] 
    // });

    // console.log('<<=== 🚀 result ===>>',result);

    //th 8 toan tu so sanh

    //  const result = await Product.find({
    //     $or: [
    //         { model_year: 2838 },
    //         { model_year: 2607 }
    //     ] 
    // });

    // console.log('<<=== 🚀 result ===>>',result);

    //TH9 Phan trang
    // const currentPage = 1; //trang hiện tại
    // const pageSize = 10; // Số lượng items trên 1 trang
    // const result = await Product.find()
    // .skip((currentPage - 1) * pageSize)
    // .limit(pageSize);
    // console.log('<<=== 🚀 result ===>>',result.length, result);

    //th 10 lấy 1 vài trường thôi
    //SELECT product_name, price, discount FROm product
    // const result = await Product.find()
    // .select('product_name price discount');
    // console.log('<<=== 🚀 result ===>>',result);

    //th11: Lay tat ca, ngoai tru nhung truong ko muon lay
    // const result = await Product.find()
    // .select('-__v -createdAt')
    // .skip(0)
    // .limit(3)
    // console.log('<<=== 🚀 result ===>>',result);

    //th 12: Toan tu Like
    // const result = await Product.find({
    //     product_name: new RegExp(/White/, 'i')
    // })
    // .select('-__v -createdAt')
    // .skip(0)
    // .limit(3)
    // console.log('<<=== 🚀 result ===>>',result);

    //th 13 Sap xep

    const result = await Product.find()
    .select('-__v -createdAt')
    .skip(0)
    .limit(3)
    .sort({
        product_name: 1, 
        //price: 1, // tang dan la 1
        price: -1, // giam dan
    })
    console.log('<<=== 🚀 result ===>>',result);
}

  try {
    runDB();
} catch (error) {
    console.log('<<=== 🚀 error ===>>',error)
}
