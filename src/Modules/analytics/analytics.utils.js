import { sequelize } from "../../DB/connection.js";

export const getAnalyticsData = async () => {
  const now = new Date();
   const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

  try {
    const [[{ totalRevenue }]] = await sequelize.query(`
      SELECT COALESCE(SUM(quantity * price), 0) AS totalRevenue
      FROM orders
    `);
    const [topProducts] = await sequelize.query(`
      SELECT 
        productId,
        SUM(quantity) AS totalSold,
        SUM(quantity * price) AS totalRevenue
      FROM orders
      GROUP BY productId
      ORDER BY totalRevenue DESC
      LIMIT 3
    `);


const [[{ revenueLastMinute, countLastMinute }]] = await sequelize.query(`
  SELECT 
    COALESCE(SUM(quantity * price), 0) AS revenueLastMinute,
    COUNT(*) AS countLastMinute
  FROM orders
  WHERE date  >= :oneMinuteAgo
`, {
  replacements: { oneMinuteAgo }
});


    return {
      totalRevenue,
      topProducts,
      revenueLastMinute,
      countLastMinute,
    };

  } catch (error) {
    console.error('Analytics Calculation Error:', error);
    throw error;
  }
};