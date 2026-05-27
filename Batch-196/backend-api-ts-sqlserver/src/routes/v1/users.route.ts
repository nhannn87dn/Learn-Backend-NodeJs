import express from 'express'
import usersController from '../../controllers/users.controller'

const router = express.Router()

router.get('/', usersController.findAll)
router.get('/:id', usersController.findById)
router.post('/', usersController.create)
router.put('/:id', usersController.update)
router.delete('/:id', usersController.remove)

export default router
