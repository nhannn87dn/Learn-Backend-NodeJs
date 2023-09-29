import express, { Express, NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { AppDataSource } from '../../data-source';
import { Supplier } from '../entities/supplier.entity';

const router = express.Router();

const repository = AppDataSource.getRepository(Supplier);

/* GET suppliers */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const suppliers = await repository.find();
    if (suppliers.length === 0) {
      res.status(204).send();
    } else {
      res.json(suppliers);
    }
  }  catch(err){
    next(err)
}
});

/* GET supplier by id */
router.get('/:id', async (req: Request, res: Response, next: any) => {
  try {
    const supplier = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!supplier) {
      throw createError(404, 'Not Found');
    }
    res.json(supplier);
  } catch(err){
    next(err)
}
});

/* POST supplier */
router.post('/', async (req: Request, res: Response, next: any) => {
  try {
    const supplier = new Supplier();
    Object.assign(supplier, req.body);
    await repository.save(supplier);
    res.status(201).json(supplier);
  }  catch(err){
    next(err)
}
});

/* PATCH supplier */
router.patch('/:id', async (req: Request, res: Response, next: any) => {
  try {
    const supplier = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!supplier) {
      throw createError(404, 'Not Found');
    }

    Object.assign(supplier, req.body);
    await repository.save(supplier);

    const updatedCategory = await repository.findOneBy({ id: parseInt(req.params.id) });
    res.json(updatedCategory);
  }  catch(err){
    next(err)
}
});

/* DELETE supplier */
router.delete('/:id', async (req: Request, res: Response, next: any) => {
  try {
    const supplier = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!supplier) {
      throw createError(404, 'Not Found');
    }
    await repository.delete({ id: supplier.id });
    res.status(200).send();
  }  catch(err){
    next(err)
}
});

export default router;
