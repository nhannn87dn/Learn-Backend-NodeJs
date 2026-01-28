import {Model, Schema, model} from "mongoose";
import { ITask } from "../types/task.type";


const taskSchema = new Schema<ITask, Model<ITask>>({
    //định nghĩa các trường (fields)
    title: {
        type: String, // kiểu dữ liệu
        required: true, //bắt buộc phải có (ALLOW NULL = false SQL)
    },
    description: {
        type: String,
        required: false,
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    //relation field
    //Giong foreign key trong SQL
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {})

const Task = model<ITask>("Task", taskSchema);
export default Task;