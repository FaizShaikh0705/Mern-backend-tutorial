import express from 'express'
import homeController from '../controllers/home.controllers.js'

const router = express.Router()

// http://localhost:5000/
router.route('/').get(homeController.home)

export default router