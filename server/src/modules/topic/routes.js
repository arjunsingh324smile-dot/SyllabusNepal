import { Router } from 'express'
import { topicController } from './controller.js'

const router = Router()

router.get('/', topicController.getAll)
router.get('/chapter/:chapterId', topicController.getByChapter)
router.get('/:id', topicController.getById)

export default router
