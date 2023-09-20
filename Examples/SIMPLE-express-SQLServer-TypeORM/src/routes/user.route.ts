
import { AppDataSource } from '../../dataSource';
import { Router, NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.entity';
const router = Router();// register routes
const repository = AppDataSource.getRepository(User);


router.get("/", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const users = await repository.find()
        res.json(users)
    }
    catch(err){
        next(err)
    }
   
})

router.get("/:id", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const results = await repository.findOneBy({
            id: parseInt(req.params.id),
        })
        res.json(results)
    }
    catch(err){
        next(err)
    }
})

router.post("/", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const user = await repository.create(req.body)
        const results = await repository.save(user)
        res.json(results)
    }
    catch(err){
        next(err)
    }
})

router.put("/:id", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const user = await repository.findOneBy({
            id: parseInt(req.params.id),
        })
        repository.merge(user, req.body)
        const results = await repository.save(user)
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
