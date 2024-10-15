import express, {Request, Response} from "express"

const router  = express.Router();

const categories = [
    {id: 1, name: 'laptop'},
    {id: 2, name: 'Mobile'},
    {id: 3, name: 'Accessories'}
]

/*
GET - Get all categories
localhost:8080/api/v1/categories
*/
router.get('', (req : Request, res: Response)=>{
    res.status(200).json(categories)
});

/*
GET get one category by ID
localhost:8080/api/v1/categories/:id
*/
router.get('/:id', (req : Request, res: Response)=>{
    const {id} = req.params; // type string
    console.log('<<=== 🚀 id ===>>',id);

    const category = categories.find(c => c.id === parseInt(id));

    res.status(200).json(category)
});

/**
 * POST - Create a new category
 * localhost:8080/api/v1/categories
 */
router.post('', (req : Request, res: Response)=>{
    const body = req.body;
    //Theem vao database

    res.status(201).json(body);
});


/*
PUT get one category by ID
localhost:8080/api/v1/categories/:id
*/
router.put('/:id', (req : Request, res: Response)=>{
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
});


/*
DELETE get one category by ID
localhost:8080/api/v1/categories/:id
*/
router.delete('/:id', (req : Request, res: Response)=>{
    const {id} = req.params; // type string
    console.log('<<=== 🚀 id ===>>',id);

    const result = categories.filter(c => c.id !== parseInt(id))

    res.status(200).json(result)
});

export default router