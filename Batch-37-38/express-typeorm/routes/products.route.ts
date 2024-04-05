import express, {Request, Response} from 'express'
const router = express();
import categoryController from '../controllers/category.controller';

//GET - http:localhost:8000/categories
router.get('', categoryController.getAll)

//update
router.put('',async(req: Request, res: Response)=>{
    
})

router.post('', async (req: Request, res: Response)=>{
    
})

router.delete('', async (req: Request, res: Response)=>{
    
})



export default router