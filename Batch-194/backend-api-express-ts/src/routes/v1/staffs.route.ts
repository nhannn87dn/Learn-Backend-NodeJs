import express, { Router } from 'express';
import staffsController from '../../controllers/staffs.controller';

const router = express.Router() as Router;

// GET api/v1/staffs ==> get all staffs
router.get('/', staffsController.findAll);
// GET api/v1/staffs/:id ==> get staff by id
router.get('/:id', staffsController.findById);
// POST api/v1/staffs ==> create new staff
router.post('/', staffsController.create);
// PUT api/v1/staffs/:id ==> Update a staff
router.put('/:id', staffsController.updateById);
// DELETE api/v1/staffs/:id ==> Delete a staff by id
router.delete('/:id', staffsController.deleteById);

export default router;

