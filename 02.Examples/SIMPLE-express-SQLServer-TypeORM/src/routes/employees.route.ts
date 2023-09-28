
import { AppDataSource } from '../../AppDataSource';
import { Router, NextFunction, Request, Response } from 'express';
import { Employees } from '../entities/employees.entity';
const router = Router();// register routes
const repository = AppDataSource.getRepository(Employees);


router.get("/", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const employees = await repository.find();

        console.log("employees",employees);

        res.json(employees);
    }
    catch(err){
        next(err)
    }
   
})

router.get("/:id", async function (req: Request, res: Response, next: NextFunction) {
    try {
        const results = await repository.findOneBy({
            EmployeeID: parseInt(req.params.id),
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
            EmployeeID: parseInt(req.params.id),
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
