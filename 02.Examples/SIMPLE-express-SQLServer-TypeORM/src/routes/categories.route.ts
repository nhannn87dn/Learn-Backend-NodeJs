
import { AppDataSource } from '../../AppDataSource';
import { Router, NextFunction, Request, Response } from 'express';
import { Categories } from '../entities/categories.entity';
const router = Router();// register routes
const repository = AppDataSource.getRepository(Categories);


router.get("/", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await repository.find();

        console.log("categories",categories);

        res.json(categories);
    }
    catch(err){
        next(err)
    }
   
})

router.get("/:id", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const results = await repository.findOneBy({
            CategoryID: parseInt(req.params.id),
        })
        res.json(results)
    }
    catch(err){
        next(err)
    }
})

router.post("/", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const employee = await repository.create(req.body)
        const results = await repository.save(employee)
        res.json(results)
    }
    catch(err){
        next(err)
    }
})

router.put("/:id", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const employee = await repository.findOneBy({
            CategoryID: parseInt(req.params.id),
        })
        repository.merge(employee, req.body)
        const results = await repository.save(employee)
        res.json(results)
    }
    catch(err){
        next(err)
    }
})

router.delete("/:id", async function (req: Request, res: Response, next: NextFunction) {
    try {
    const results = await repository.delete(req.params.id)
    res.json(results)
    }
    catch(err){
        next(err)
    }
})

export default router;
