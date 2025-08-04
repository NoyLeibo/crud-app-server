import express from 'express'
import { ProductController } from '../controllers/product.controller'

const router = express.Router()

router.post('/', ProductController.createProduct)
router.get('/', ProductController.getProduct)
router.delete('/', ProductController.deleteProduct)

export const productRoutes = router
