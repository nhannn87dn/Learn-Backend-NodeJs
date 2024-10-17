import {Request, Response} from "express";

const categories = [
    {id: 1, name: 'laptop'},
    {id: 2, name: 'Mobile'},
    {id: 3, name: 'Accessories'}
]

/* get ALl categories */
const findAll =  (req : Request, res: Response)=>{
    res.status(200).json(categories)
}

/* get Single Category */
const findOne = (req : Request, res: Response)=>{
    const {id} = req.params; // type string
    console.log('<<=== 🚀 id ===>>',id);

    const category = categories.find(c => c.id === parseInt(id));

    res.status(200).json(category)
};

/* create a new category */
const create = (req : Request, res: Response)=>{
    const body = req.body;
    //Theem vao database

    res.status(201).json(body);
}

/* update a category */
const updateById = (req : Request, res: Response)=>{
    const {id} = req.params; // type string
    console.log('<<=== 🚀 id ===>>',id);
    const body = req.body;

    const category = categories.map((c)=> {
        if(c.id === parseInt(id)){
            c.name = body.name// gan lai ten moi
        }
        return c
    })

    res.status(200).json(category)
}

/* delete a category */
const deleteById = (req : Request, res: Response)=>{
    const {id} = req.params; // type string
    console.log('<<=== 🚀 id ===>>',id);

    const result = categories.filter(c => c.id !== parseInt(id))

    res.status(200).json(result)
}

export default {
    findAll,
    findOne,
    create,
    updateById,
    deleteById
}