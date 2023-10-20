import express from 'express';
import usersController from '../../controllers/users.controller';

const router  = express.Router(); //NOT: express()

//Get ALLs
router.get('/', usersController.getAll);
//get user by id
router.get('/:id', usersController.getById);
//create a new users
router.post('/', usersController.create);
//xuất ra
export default router;