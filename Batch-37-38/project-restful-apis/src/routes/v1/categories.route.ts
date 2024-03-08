import express from "express";
const router   = express.Router();

//Dinh nghia cac routes cho resource Categories

//Get All
//http://localhost:8080/api/v1/categories
router.get('', (req, res) => {
    res.status(200).json({message: 'Get All Categories'})
})

//Get By ID
//http://localhost:8080/api/v1/categories/:id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    res.status(200).json({message: `Get Category by ID ${id}`})
})


//Create category 
///http://localhost:8080/api/v1/categories
router.post('', (req, res) => {
    const data = req.body;
    res.status(200).json({
        message: `Create Category`,
        payload: data
    })
})

//Update category By ID
///http://localhost:8080/api/v1/categories/:id
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const data = req.body;
    res.status(200).json({
        message: `Update Category by ID ${id}`,
        payload: data
    })
})

//Delete category By ID
///http://localhost:8080/api/v1/categories/:id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    res.status(200).json({
        message: `Delete Category by ID ${id}`
    })
})

export default router