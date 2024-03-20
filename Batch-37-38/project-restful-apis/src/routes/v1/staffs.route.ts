import express from "express";
import staffsController from "../../controllers/staffs.controller";
import { authenticateToken, authorize } from "../../middlewares/auth.middleware";
const router   = express.Router();

//Dinh nghia cac routes cho resource Categories

//Get All
//http://localhost:8080/api/v1/staffs
router.get('', authenticateToken, staffsController.getAll)

//Get By ID
//http://localhost:8080/api/v1/staffs/:id
router.get('/:id', authenticateToken, staffsController.getStaffById)


//Create category 
///http://localhost:8080/api/v1/staffs
router.post('',  staffsController.createStaff)

//Update category By ID
///http://localhost:8080/api/v1/staffs/:id
router.put('/:id', staffsController.updateStaff)

//Delete category By ID
///http://localhost:8080/api/v1/staffs/:id
//Chỉ chó phép role = admin moi xoa dc
router.delete('/:id',authenticateToken, authorize(['admin', 'subAdmin']), staffsController.deleteStaff)

export default router