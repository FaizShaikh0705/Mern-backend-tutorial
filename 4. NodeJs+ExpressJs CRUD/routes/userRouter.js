import express from 'express'
import userController from '../controller/userController.js'

const router = express.Router()

// http://localhost:5000/users/
router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

export default router