import { Schema, model } from "mongoose";

const staffSchema = new Schema(
  {
    name: { 
        type: String, 
        required: true,
        minLength: 3,
        maxLength: 255,
        trim: true,
     },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
     },
    password: { 
        type: String, 
        required: true,
        minLength: 6,
        maxLength: 255,
        trim: true,
     },
    is_active: { type: Boolean, default: true },
    role: { 
        type: String, 
        enum: ["admin", "staff"], 
        default: "staff",
     },
  },
  {
    timestamps: true,
    collection: "staffs",
  },
);

const Staff = model("Staff", staffSchema);
export default Staff;
