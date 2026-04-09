import { Router } from 'express'
import { chapterController } from './controller.js'

const router = Router()

router.get('/', chapterController.getAll)
router.get('/subject/:subjectId', chapterController.getBySubject)
router.get('/:id', chapterController.getById)

export default router
