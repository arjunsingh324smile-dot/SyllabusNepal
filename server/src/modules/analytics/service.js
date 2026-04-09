import { Analytics } from './model.js'

export const analyticsService = {
  async track(event, data = {}) {
    return Analytics.create({ event, ...data })
  },

  async getPopular(resourceType, limit = 10) {
    return Analytics.aggregate([
      { $match: { event: 'view', resourceType } },
      { $group: { _id: '$resourceId', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: limit },
    ])
  },

  async getStats() {
    const [totalViews, uniqueResources] = await Promise.all([
      Analytics.countDocuments({ event: 'view' }),
      Analytics.distinct('resourceId', { event: 'view' }),
    ])
    return { totalViews, uniqueResources: uniqueResources.length }
  },
}
