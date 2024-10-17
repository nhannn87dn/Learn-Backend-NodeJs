import {Request, Response} from "express";
import categoryService from "../services/category.service";

/* get ALl categories */
const findAll =  (req : Request, res: Response)=>{
    const categories = categoryService.findAll();
    res.status(200).json(categories)
}

/* get Single Category */
const findOne = (req : Request, res: Response)=>{
    const {id} = req.params; // type string
    console.log('<<=== 🚀 id ===>>',id);

    const category = categoryService.findOne(parseInt(id));
    // response cho client
    res.status(200).json(category)
};

/* create a new category */
const create = (req : Request, res: Response)=>{
    const body = req.body;
    //Theem vao database
    const category = categoryService.create(body);

    res.status(201).json(category);
}

/* update a category */
const updateById = (req : Request, res: Response)=>{
    const {id} = req.params; // type string
    console.log('<<=== 🚀 id ===>>',id);
    const body = req.body;

    const category = categoryService.updateById(parseInt(id), body)

    res.status(200).json(category)
}

/* delete a category */
const deleteById = (req : Request, res: Response)=>{
    const {id} = req.params; // type string
    console.log('<<=== 🚀 id ===>>',id);

    const result = categoryService.deleteById(parseInt(id));

    res.status(200).json(result)
}



export default {
    findAll,
    findOne,
    create,
    updateById,
    deleteById
}