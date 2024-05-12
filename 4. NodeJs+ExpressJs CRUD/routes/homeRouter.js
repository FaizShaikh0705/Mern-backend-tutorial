import express from 'express'
import homeController from '../controller/homeController.js'

const router = express.Router()

// http://localhost:5000/
router.route('/').get(homeController.home)

export default router