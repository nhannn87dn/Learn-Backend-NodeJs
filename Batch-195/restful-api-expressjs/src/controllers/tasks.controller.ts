import type { Request, Response, NextFunction } from 'express';
import tasksService from '../services/tasks.service';
import { sendJsonSuccess, SUCCESS } from '../helpers/responseHandler';

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await tasksService.getAllTasks();
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; //id is string
  console.log(typeof id);
  try {
    const task = await tasksService.getTaskById(id);
    //res.json(task);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  console.log('<<=== 🚀 payload ===>>', payload);
  try {
    const newTask = await tasksService.createTask(payload);
    //res.status(201).json(newTask);
    sendJsonSuccess({
      res,
      status: SUCCESS.CREATED,
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

const updateTaskById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const updatedTask = await tasksService.updateTaskById(id, payload);
    //res.json(updatedTask);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTaskById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedTasks = await tasksService.deleteTaskById(id);
    //res.json(deletedTasks);
    sendJsonSuccess({
      res,
      status: SUCCESS.OK,
      data: deletedTasks,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  createTask,
};
