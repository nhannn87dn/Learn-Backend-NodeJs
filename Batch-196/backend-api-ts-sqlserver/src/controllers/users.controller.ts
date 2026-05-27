import type { Request, Response, NextFunction } from "express"
import usersService from "../services/users.service"

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersService.findAll()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usersService.getByIdOrFail(Number(req.params.id))
    res.json(user)
  } catch (error) {
    next(error)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, age } = req.body
    const newUser = await usersService.create(name, email, Number(age))
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, age } = req.body
    const updatedUser = await usersService.updateById(Number(req.params.id), name, email, Number(age))
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await usersService.deleteById(Number(req.params.id))
    res.status(204).json(deletedUser)
  } catch (error) {
    next(error)
  }
}

export default {
  findAll,
  findById,
  create,
  update,
  remove,
}
