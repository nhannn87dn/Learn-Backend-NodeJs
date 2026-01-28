import { TTaskPayload } from "../types/task.type";
import createError from 'http-errors';

const tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
  { id: 3, title: 'Task 3', completed: false },
];

const getAllTasks = ()=>{
    return tasks;
}

const getTaskById = (id: number) => {
    const task =  tasks.find(t => t.id === id);
    if (!task) {
    //   throw new Error('Task not found');
        throw createError(404, 'Task not found');
    }
    return task;
}


const createTask = (payload: TTaskPayload) => {
    // Implementation for creating a task
    const newTask = {
        id: tasks.length + 1,
        title: payload.title,
        completed: payload.completed
    };
    //thêm item vào mảng tasks
    tasks.push(newTask);
    return newTask;
}

const updateTaskById = (id: number, payload: TTaskPayload) => {
    // Implementation for updating a task
    let task = getTaskById(id);
    task = { ...task, ...payload };
    return task;
    
}

const deleteTaskById = (id: number) => {
    // trả về mảng tasks sau khi xóa
    const tasksFiltered = tasks.filter(t => t.id !== id);
    return tasksFiltered;
}

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById
}