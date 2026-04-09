import { Router } from 'express'
import { competitiveController } from './controller.js'

const router = Router()

router.get('/', competitiveController.getAll)
router.get('/:id', competitiveController.getById)

export default router
