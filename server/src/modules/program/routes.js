import { Router } from 'express'
import { programController } from './controller.js'

const router = Router()

router.get('/', programController.getAll)
router.get('/category/:category', programController.getByCategory)
router.get('/:id', programController.getById)

export default router
