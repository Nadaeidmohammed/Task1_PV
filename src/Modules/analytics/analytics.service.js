import { getAnalyticsData } from "./analytics.utils.js";

export const getAnalytics = async (req, res, next) => {
 
    const data = await getAnalyticsData();
    
    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalRevenue: data.totalRevenue,
          lastMinute: {
            revenue: data.revenueLastMinute,
            orders: data.countLastMinute
          }
        },
        topProducts: data.topProducts,
      }
    });
 
};