import express from "express";
import Product from "../../models/product.model";
import Staff from "../../models/staff.model";

const router   = express.Router();

router.get('', async (req, res) => {
    //1. Tìm all sản phẩm
    const result = await Staff.find();
   
    //2. Tìm 1 record by _id
   // const result = await Product.findById('65f2be7b1d80b8bd5e195c5a');
    
   //3. Tìm theo danh mục
   //WHERE category = '65f2be7b1d80b8bd5e195c39'
    // const result = await Product.findOne({
    //     category: '65f2be7b1d80b8bd5e195c39'
    // });

     //3. Tìm theo danh mục
     //wHERE price > 1000 and stock < 30
    //  const result = await Product.findOne({
    //     price: { $gt: 1000 },
    //     stock: { $eq: 125 }
    // });

     //4. Liệt kê các trường cần lấy
     //wHERE price > 1000 and stock < 30
    //  const result = await Product.findOne({
    //     price: { $gt: 1000 },
    //     stock: { $eq: 125 }
    // }).select('_id productName price discount category');

    //5. Lấy tất cả ngoài trừ trường _v
    //const result = await Product.find().select('-__v -updatedAt');

    //6. Sắp xếp ORDER BY
    // const result = await Product
    // .find()
    // .select('-__v -updatedAt')
    // .sort('-sort') //ASC, .sort('-sort') ==>DESC
    // ;
    //or
    // const result = await Product
    // .find()
    // .select('-__v -updatedAt')
    // .sort({sort: 1}); //1 ASC,  -1 DESC
    
    //7. Phân trang
    // const currentPage = req.query.page ? parseInt(req.query.page as string) : 1; //trang hiện tại
    // const pageSize = req.query.limit ? parseInt(req.query.limit as string) : 5; // Số lượng items trên 1 trang

    // const result = await Product
    // .find()
    // .select('-__v -updatedAt')
    // .sort({sort: 1})
    // .skip((currentPage - 1) * pageSize)
    // .limit(pageSize);

    //8. Join các collections
    // const currentPage = req.query.page ? parseInt(req.query.page as string) : 1; //trang hiện tại
    // const pageSize = req.query.limit ? parseInt(req.query.limit as string) : 5; // Số lượng items trên 1 trang

    // const result = await Product
    // .find()
    // .select('-__v -updatedAt')
    // .sort({sort: 1})
    // .skip((currentPage - 1) * pageSize)
    // .limit(pageSize)
    // //.populate('category', 'categoryName')
    // .populate('brand')
    // .lean({virtuals: true})
    // ;

    //9. Update bi _id
    //UPDATE product SET price = 1300 WHERE _id = ''
    // const result = await Product.findByIdAndUpdate(
    //     '65f2be7b1d80b8bd5e195c5a',
    //     {
    //         price: 1300
    //     },
    //     {
    //         new: true,
    //     }
    //     )
        
    //10. Update theo mot truong cu the
    //UPDATE product SET sort = 49 WHERE sort = 50
    // const result = await Product.updateMany(
    //     {
    //         sort: 50
    //     },
    //     {
    //         sort: 49
    //     },
    //     {
    //         new: true,
    //     }
    //     )
    res.json(result)
})

export default router