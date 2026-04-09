import { subjectService } from './service.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { ApiResponse } from '../../utils/ApiResponse.js'

export const subjectController = {
  getAll: asyncHandler(async (req, res) => {
    const { programId } = req.query
    const subjects = await subjectService.getAll({ programId })
    res.json(ApiResponse.ok(subjects))
  }),

  getById: asyncHandler(async (req, res) => {
    const subject = await subjectService.getById(req.params.id)
    res.json(ApiResponse.ok(subject))
  }),

  getByProgram: asyncHandler(async (req, res) => {
    const subjects = await subjectService.getByProgram(req.params.programId)
    res.json(ApiResponse.ok(subjects))
  }),
}
