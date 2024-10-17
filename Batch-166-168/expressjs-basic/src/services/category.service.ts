const categories = [
    {id: 1, name: 'laptop'},
    {id: 2, name: 'Mobile'},
    {id: 3, name: 'Accessories'}
]

/* get ALl categories */
const findAll = ()=>{
    //Lay du lieu trong DB
    // return lai cho controller
    return categories
}

/* get Single Category */
const findOne = (id: number)=>{
    const category = categories.find(c => c.id === id);
    return category
};

/* create a new category */
const create = (payload: any)=>{
    return payload
};

/* update a category */
const updateById = (id: number, payload: any)=>{
    const category = categories.map((c)=> {
        if(c.id === id){
            c.name = payload.name// gan lai ten moi
        }
        return c
    })
    return category
}

/* delete a category */
const deleteById = (id: number)=>{
    const category = categories.filter(c=> c.id !== id);
    return category
};

export default {
    findAll,
    findOne,
    create,
    updateById,
    deleteById
}