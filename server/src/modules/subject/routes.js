import { Router } from 'express'
import { subjectController } from './controller.js'

const router = Router()

router.get('/', subjectController.getAll)
router.get('/program/:programId', subjectController.getByProgram)
router.get('/:id', subjectController.getById)

export default router
