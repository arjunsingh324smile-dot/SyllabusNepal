import { Router } from 'express'
import { searchController } from './controller.js'

const router = Router()

router.get('/', searchController.search)

export default router
