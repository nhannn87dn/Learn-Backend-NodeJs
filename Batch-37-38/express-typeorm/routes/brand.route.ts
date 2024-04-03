import express, {Request, Response} from 'express'
import { myDataSource } from '../data-soucre';
import { Brand } from '../entities/Brand.entity';

const router = express();
const brandRepository = myDataSource.getRepository(Brand)

router.get('', async (req: Request, res: Response)=>{
    //SELECT ALL
    const result = await brandRepository.find();

    console.log('result',result);

    res.json(result)
})

router.post('', async (req: Request, res: Response)=>{
    //SELECT ALL
    const brand = brandRepository.create({
        name: "Asus",
        description: "Asus gia re"
    })
    //lưu
    const result = await brandRepository.save(brand)


    res.json(result)
})


export default router