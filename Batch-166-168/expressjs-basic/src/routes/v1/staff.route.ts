import express from "express"
import staffController from '../../controllers/staff.controller'
import validateSchemaYup from "../../middlewares/validateSchemaYup.middleware";
import staffValidation from "../../validations/staff.validation";
import { authenticateToken } from "../../middlewares/auth.middleware";
const router  = express.Router();

/*
GET - Get all staffs
localhost:8080/api/v1/staffs
*/
router.get('', authenticateToken, staffController.findAll);
/*
GET get one staff by ID
localhost:8080/api/v1/staffs/:id
*/
router.get('/:id', authenticateToken, staffController.findOne);
/**
 * POST - Create a new staff
 * localhost:8080/api/v1/staffs
 */
router.post('',authenticateToken, validateSchemaYup(staffValidation.create), staffController.create);
/*
PUT get one staff by ID
localhost:8080/api/v1/staffs/:id
*/
router.put('/:id', authenticateToken, staffController.updateById);
/*
DELETE get one staff by ID
localhost:8080/api/v1/staffs/:id
*/
router.delete('/:id', authenticateToken, staffController.deleteById);

export default router