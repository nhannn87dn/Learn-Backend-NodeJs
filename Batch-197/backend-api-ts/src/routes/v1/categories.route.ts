import express,  { type Request, type Response } from 'express';
const router = express.Router();


// GET /api/v1/categories
router.get('/', (req: Request, res: Response) => {
    res
    .status(200)
    .json({ 
        message: 'List of categories' 
    });
});

// GET /api/v1/categories/:id
router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res
    .status(200)
    .json({ 
        message: 'Get category by id',
        id: id 
    });
});

// POST /api/v1/categories - create a new category
router.post('/', (req: Request, res: Response) => {
    // Lấy dữ liệu từ body của request
    const payload = req.body;
    console.log('<<=== 🚀 payload ===>>',payload);
    //response lại cho client
    res
    .status(201)
    .json({ 
        message: 'create a new category',
        data: payload 
    });
});

// PUT /api/v1/categories/:id - update a category by id
router.put('/:id', (req: Request, res: Response) => {
    //lấy id cần update
    const { id } = req.params;
    // Lấy dữ liệu từ body của request
    const payload = req.body;
    console.log('<<=== 🚀 payload ===>>',payload);
    //response lại cho client
    res
    .status(200)
    .json({ 
        message: 'update a category by id',
        id: id,
        data: payload 
    });
});

// DELETE /api/v1/categories/:id - delete a category by id
router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res
    .status(200)
    .json({ 
        message: 'delete a category by id',
        id: id
    });
});

export default router;