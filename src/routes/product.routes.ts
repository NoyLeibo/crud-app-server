import express from 'express'
import { ProductController } from '../controllers/product.controller'

const router = express.Router()

router.post('/', ProductController.create)

export const productRoutes = router
