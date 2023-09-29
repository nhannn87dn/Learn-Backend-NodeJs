import express, { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { AppDataSource } from '../../data-source';
import { Category } from '../entities/category.entity';

const router = express.Router();

const repository = AppDataSource.getRepository(Category);

/* GET categories */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await repository.find();
    if (categories.length === 0) {
      res.status(204).send({
        error: 'No content',
      });
    } else {
      res.json(categories);
    }
  }
  catch(err){
    next(err)
}
});

/* GET category by id */
router.get('/:id', async (req: Request, res: Response, next: any) => {
  try {
    const category = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!category) {
      throw createError(404, 'Not Found');
    }
   
    res.json(category);
  }  catch(err){
    next(err)
}
});

/* POST category */
router.post('/', async (req: Request, res: Response, next: any) => {
  try {
    const category = new Category();
    Object.assign(category, req.body);

    // MANUAL VALIDATION
    // const errors = await category.validate();
    // if (errors) {
    //   res.status(400).json(errors);
    //   return;
    // }

    // HOOKS (AUTO VALIDATE)
    await repository.save(category);
    res.status(201).json(category);
  }  catch(err){
    next(err)
}
});

/* PATCH category */
router.patch('/:id', async (req: Request, res: Response, next: any) => {
  try {
    const category = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!category) {
      throw createError(404, 'Not Found');
    }

    Object.assign(category, req.body);
    await repository.save(category);

    const updatedCategory = await repository.findOneBy({ id: parseInt(req.params.id) });
    res.json(updatedCategory);
  }  catch(err){
    next(err)
}
});

/* DELETE category */
router.delete('/:id', async (req: Request, res: Response, next: any) => {
  try {
    const category = await repository.findOneBy({ id: parseInt(req.params.id) });
    if (!category) {
      throw createError(404, 'Not Found');
    }
    await repository.delete({ id: category.id });
    res.status(200).send();
  }  catch(err){
    next(err)
}
});

export default router;
