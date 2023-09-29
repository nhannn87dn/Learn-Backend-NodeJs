import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { AppDataSource } from '../../data-source';
import { Product } from '../entities/product.entity';

const router = express.Router();

const repository = AppDataSource.getRepository(Product);

/* GET products */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // SELECT * FROM [Products] AS 'product'
    const products = await repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.supplier', 'supplier')
      .getMany();

    if (products.length === 0) {
      res.status(204).send();
    } else {
      res.json(products);
    }
  }  catch(err){
    next(err)
}
});

/* GET product by id */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.supplier', 'supplier')
      .where('product.id = :id', { id: parseInt(req.params.id) })
      .getOne();
    if (!product) {
      throw createError(404, 'Not Found');
    }
    res.json(product);
  }  catch(err){
    next(err)
}
});

/* POST product */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = new Product();
    Object.assign(product, req.body);
    await repository.save(product);
    res.status(201).json(product);
  }  catch(err){
    next(err)
}
});

/* PATCH product */
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!product) {
      throw createError(404, 'Not Found');
    }

    Object.assign(product, req.body);

    await repository.save(product);

    const updatedCategory = await repository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'c')
      .where('p.id = :id', { id: parseInt(req.params.id) })
      .getOne();
    res.json(updatedCategory);
  }  catch(err){
    next(err)
}
});

/* DELETE product */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!product) {
      throw createError(404, 'Not Found');
    }
    await repository.delete({
      id: product.id,
    });
    res.status(200).send();
  }  catch(err){
    next(err)
}
});

export default router;
