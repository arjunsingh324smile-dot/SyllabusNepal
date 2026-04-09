import { Router } from 'express'
import { entranceController } from './controller.js'

const router = Router()

router.get('/', entranceController.getAll)
router.get('/:id', entranceController.getById)

export default router
