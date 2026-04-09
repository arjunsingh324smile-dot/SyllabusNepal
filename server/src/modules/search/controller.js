import { searchService } from './service.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { ApiResponse } from '../../utils/ApiResponse.js'

export const searchController = {
  search: asyncHandler(async (req, res) => {
    const { q, limit } = req.query
    const results = await searchService.search(q, parseInt(limit, 10) || 20)
    res.json(ApiResponse.ok(results))
  }),
}
