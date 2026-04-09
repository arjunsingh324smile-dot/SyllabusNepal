import { analyticsService } from './service.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { ApiResponse } from '../../utils/ApiResponse.js'

export const analyticsController = {
  track: asyncHandler(async (req, res) => {
    const { event, resourceType, resourceId, metadata } = req.body
    await analyticsService.track(event, { resourceType, resourceId, metadata })
    res.json(ApiResponse.ok(null, 'Event tracked'))
  }),

  getPopular: asyncHandler(async (req, res) => {
    const { type, limit } = req.query
    const popular = await analyticsService.getPopular(type, parseInt(limit, 10) || 10)
    res.json(ApiResponse.ok(popular))
  }),

  getStats: asyncHandler(async (_req, res) => {
    const stats = await analyticsService.getStats()
    res.json(ApiResponse.ok(stats))
  }),
}
