import express, { Response, Request } from 'express'
import { productController } from '../controller/products.controller'

const router = express.Router()

router.post('/create', productController.createNewProduct)
router.post('/', productController.createNewProduct)

export default router
