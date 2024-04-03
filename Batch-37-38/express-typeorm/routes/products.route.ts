import express, {Request, Response} from 'express'
import { myDataSource } from '../data-soucre';
import { Product } from '../entities/Product.entity';
const router = express();
const productRepository = myDataSource.getRepository(Product)
import { 
    LessThan, //<
    LessThanOrEqual,//<=
    MoreThan,// >
    MoreThanOrEqual, //>=
    Equal, // =
    Like,
    } from "typeorm"

router.get('', async (req: Request, res: Response)=>{
    //SELECT ALL
    //const result = await productRepository.find();
    //Lay nhung truong can thiet
    // const result = await productRepository.find({
    //     select: {
    //         name: true,
    //         price: true
    //     }
    // });
    //SELECT voi WHERE
    // const result = await productRepository.find({
    //     where: {
    //         price: 800
    //     }
    // });
    // const result = await productRepository.findBy({
    //     price: 800
    // });

    //SELECT voi WHERE toan tu 
    //SELECT * FROM product WHERE brandId = 1 AND catepgoryID = 1
    // const result = await productRepository.find({
    //     where: {
    //         brand: {id: 1},
    //         category: {id: 1}
    //     }
    // });


    //SELECT voi WHERE toan tu  OR
    //SELECT * FROM product WHERE brandId = 1 OR brandId = 5
    // const result = await productRepository.find({
    //     where: [
    //         {brand: {id: 1}},
    //         {brand: {id: 5}}
    //     ]
    // });
    //SELECT voi WHERE toan tu  So sanh
    //SELECT * FROM product WHERE price >= 800
    // const result = await productRepository.find({
    //     where: {
    //         price: MoreThan(800)
    //     }
    // });
    //SELECT voi toan tu LIKE
    // const result = await productRepository.find({
    //     select: {

    //     },
    //     where: {
    //         name: Like('%Pizza%')// LIKE '%Pizza%'
    //     }
    // });
    const page = 1;
    const limit= 10;
    const [products, totalCount] = await productRepository.findAndCount({
        select: {
            id: true,
            name: true,
            category: {
                name: true
            }
        },
        relations: {
            category: true,
            brand: true
        },
        order: {
            id: "DESC",
        },
        skip: (page - 1) * limit,
        take: limit,
    });
    const result = {
        products,
        totalCount
    }
    console.log('result',result);

    res.json(result)
})
//update
router.put('',async(req: Request, res: Response)=>{
    const product = await productRepository.findOneBy({
        id: 5,
    })
    const payload = {
        discount: 50
    }
    productRepository.merge(product, payload)
    const results = await productRepository.save(product)
    return res.send(results)
})

router.post('', async (req: Request, res: Response)=>{
    const product =  productRepository.create({
        name: 'Iphone 16',
        price: 800,
        stock: 10,
        discount: 0,
        description: 'Co ban tra gop',
        category: {id: 1},
        brand: {id: 1}
    })
    const result = await productRepository.save(product)
    res.json(result)
})

router.delete('', async (req: Request, res: Response)=>{
    const product = await productRepository.findOneBy({
        id: 6,
    })
    //const result =  await productRepository.delete({id: product.id})
    const result = await productRepository.remove(product)
    res.json(result)
})



export default router