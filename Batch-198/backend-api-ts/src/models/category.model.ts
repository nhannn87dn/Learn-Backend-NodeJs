import mongoose from "mongoose";

//create category schema
const categorySchema = new mongoose.Schema({
    category_name: {
        type: String, // kieu du lieu
        required: true, // yeu cau phai dien gia tri
        maxLength: 50, // gioi han do dai
    },
    description: {
        type: String,
        required: true,
         maxLength: 500, // gioi han do dai
    },
    slug: {
        type: String,
        required: true,
        unique: true, // slug phai duy nhat
        maxLength: 50, // gioi han do dai
    }
},{
    timestamps: true, // tu dong tao createdAt va updatedAt
    collection: "categories", // ten collection trong DB
    versionKey: false, // khong tao field __v
});

//create category model
const Category = mongoose.model("Category", categorySchema);
export default Category;