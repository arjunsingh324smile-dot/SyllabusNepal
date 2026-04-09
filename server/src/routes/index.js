import { Router } from 'express'
import programRoutes from '../modules/program/routes.js'
import subjectRoutes from '../modules/subject/routes.js'
import chapterRoutes from '../modules/chapter/routes.js'
import topicRoutes from '../modules/topic/routes.js'
import entranceRoutes from '../modules/entrance/routes.js'
import competitiveRoutes from '../modules/competitive/routes.js'
import searchRoutes from '../modules/search/routes.js'
import analyticsRoutes from '../modules/analytics/routes.js'

export const apiRouter = Router()

apiRouter.use('/programs', programRoutes)
apiRouter.use('/subjects', subjectRoutes)
apiRouter.use('/chapters', chapterRoutes)
apiRouter.use('/topics', topicRoutes)
apiRouter.use('/entrance', entranceRoutes)
apiRouter.use('/competitive', competitiveRoutes)
apiRouter.use('/search', searchRoutes)
apiRouter.use('/analytics', analyticsRoutes)
