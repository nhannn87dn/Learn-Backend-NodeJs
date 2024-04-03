import express, {Request, Response} from 'express'
import { myDataSource } from '../data-soucre';
import { Category } from '../entities/Category.entity';

const router = express();
const categoryRepository = myDataSource.getRepository(Category)

router.get('', (req: Request, res: Response)=>{
    //SELECT ALL
    const result = categoryRepository.find();

    res.json(result)
})

export default router