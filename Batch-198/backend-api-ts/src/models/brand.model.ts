import mongoose from "mongoose";

//create brand schema
const brandSchema = new mongoose.Schema({
    brand_name: {
        type: String, // kieu du lieu
        required: true, // yeu cau phai dien gia tri
        maxLength: 50, // gioi han do dai
        trim: true, // cat bo khoang trang dau va cuoi chuoi
        unique: true,
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
        trim: true
    }
},{
    timestamps: true, // tu dong tao createdAt va updatedAt
    collection: "brands", // ten collection trong DB
    versionKey: false, // khong tao field __v
});

//create brand model
const Brand = mongoose.model("Brand", brandSchema);
export default Brand;