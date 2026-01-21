import type { Request, Response } from 'express';
import tasksService from '../services/tasks.service';
import { sendJsonSuccess, SUCCESS, } from '../helpers/responseHandler';

const getAllTasks = (req: Request, res: Response) => {
  const data = tasksService.getAllTasks();
  // res.json({
  //   statusCode: 200,
  //   message: 'Tasks fetched successfully',
  //   data: data,
  // });
  sendJsonSuccess({
    res,
    status: SUCCESS.OK,
    data: data,
  });
};

const getTaskById = (req: Request, res: Response) => {
  const { id } = req.params; //id is string
  console.log(typeof id);
  const task = tasksService.getTaskById(Number(id));
  //res.json(task);
  sendJsonSuccess({
    res,
    status: SUCCESS.OK,
    data: task,
  });
};

const createTask = (req: Request, res: Response) => {
const payload = req.body;
console.log('<<=== 🚀 payload ===>>',payload);
  const newTask = tasksService.createTask(payload);
  //res.status(201).json(newTask);
  sendJsonSuccess({
    res,
    status: SUCCESS.CREATED,
    data: newTask,
  });
}

const updateTaskById = (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const updatedTask = tasksService.updateTaskById(Number(id), payload);
  //res.json(updatedTask);
  sendJsonSuccess({
    res,
    status: SUCCESS.OK,
    data: updatedTask,
  });
}

const deleteTaskById = (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTasks = tasksService.deleteTaskById(Number(id));
  //res.json(deletedTasks);
  sendJsonSuccess({
    res,
    status: SUCCESS.OK,
    data: deletedTasks,
  });
}

export default {
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    createTask
}