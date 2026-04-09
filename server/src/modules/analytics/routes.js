import { Router } from 'express'
import { analyticsController } from './controller.js'

const router = Router()

router.post('/track', analyticsController.track)
router.get('/popular', analyticsController.getPopular)
router.get('/stats', analyticsController.getStats)

export default router
