import {Model, Schema, model} from "mongoose";
import { IUser } from "../types/user.type";


const userSchema = new Schema<IUser, Model<IUser>>({
   name: {
        type: String,
        required: true,
   },
    email: {
        type: String,
        required: true,
    }
}, {})

const User = model<IUser>("User", userSchema);
export default User;