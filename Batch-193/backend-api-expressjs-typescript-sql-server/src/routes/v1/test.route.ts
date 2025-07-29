import express from "express";
import { Test } from "../../entities/Test.entity";
import { myDataSource } from "../../data-soucre";

const router = express.Router();

const testRepository = myDataSource.getRepository(Test);

// Test route
router.get("/test", async (req, res) => {
    //const list = testRepository.find();
    //insert 

     const test =  testRepository.create({
        firstName: 'Ngoc',
        lastName: 'Nhan'
     })
    //lu lai
    await testRepository.save(test)

    res.json({ message: "Test" });
});

export default router;
