import { Request, Response } from "express";
import users from '../data/user.json';
import usersService from "../services/users.service";

const getAll = (req: Request, res: Response) => {
  res.status(200).json(users);
}

const getById = (req: Request, res: Response) => {
  const id = req.params.id;

  //Được coi là logic xử lý
  const user = usersService.getById(parseInt(id))


  res.status(200).json(user);
}

const create = (req: Request, res: Response) => {
  const payload = req.body;
  console.log('create',req.body);
  res.status(200).json({msg: 'ok',payload});
}

export default {
  getById,
  getAll,
  create
}