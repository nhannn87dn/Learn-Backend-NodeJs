import { TTaskPayload } from "../types/task.type";
import createError from 'http-errors';
import Task from "../models/task.model";

const tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
  { id: 3, title: 'Task 3', completed: false },
];

const getAllTasks = async ()=>{
    //get all tasks from database
    const result = await Task.find();
    return result;
}

const getTaskById = async(id: string) => {
    //const task =  tasks.find(t => t.id === id);
    //SELECT * FROM tasks WHERE id = id
    const task  = await Task.findById(id);
    if (!task) {
    //   throw new Error('Task not found');
        throw createError(404, 'Task not found');
    }
    return task;
}


const createTask = async (payload: TTaskPayload) => {
    // Implementation for creating a task
    // const newTask = {
    //     id: tasks.length + 1,
    //     title: payload.title,
    //     completed: payload.completed
    // };
    // //thêm item vào mảng tasks
    // tasks.push(newTask);
    const newTask = {
        title: payload.title,
        description: payload.description,
        isCompleted: payload.completed,
    };
    const task = new Task(newTask);
    const result = await task.save(); //lưu vào database
    //trả về kết quả tạo mới
    return result;
}

const updateTaskById = async (id: string, payload: TTaskPayload) => {
    // Implementation for updating a task
    let task = await getTaskById(id);
    Object.assign(task, {
        title: payload.title,
        description: payload.description,
        isCompleted: payload.completed,
    });
    const result = await task.save();
    //trả về kết quả cập nhật
    return result;
    
}

const deleteTaskById = async (id: string) => {
    // trả về mảng tasks sau khi xóa
    const task = await getTaskById(id);
    const result = await Task.deleteOne({_id: task._id});
    //trả về kết quả xóa
    return result;
   
}

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById
}
