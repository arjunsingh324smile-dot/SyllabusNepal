import { programService } from './service.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { ApiResponse } from '../../utils/ApiResponse.js'

export const programController = {
  getAll: asyncHandler(async (req, res) => {
    const { category } = req.query
    const programs = await programService.getAll({ category })
    res.json(ApiResponse.ok(programs))
  }),

  getById: asyncHandler(async (req, res) => {
    const program = await programService.getById(req.params.id)
    res.json(ApiResponse.ok(program))
  }),

  getByCategory: asyncHandler(async (req, res) => {
    const programs = await programService.getByCategory(req.params.category)
    res.json(ApiResponse.ok(programs))
  }),
}
