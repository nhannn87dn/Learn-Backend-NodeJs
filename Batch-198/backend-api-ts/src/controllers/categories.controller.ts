import {Request, Response} from "express";
import categoriesService from "../services/categories.service";

export const findAll = async (req: Request, res: Response) => {
    const categories = await categoriesService.findAll();
    res.status(200).json(categories);
}

export const findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await categoriesService.findById(String(id));
    res.status(200).json(category);
}

export const create = async (req: Request, res: Response) => {
    const payload = req.body;
    const newCategory = await categoriesService.create(payload);
    res.status(201).json(newCategory);
}

export const updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const updatedCategory = await categoriesService.updateById(String(id), payload);
    res.status(200).json(updatedCategory);
}

export const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedCategory = await categoriesService.deleteById(String(id));
    res.status(200).json(deletedCategory);
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}