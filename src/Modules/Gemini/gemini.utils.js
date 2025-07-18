import { sequelize } from "../../DB/connection.js";

export const getRecentSales = async () => {
  const [results] = await sequelize.query(`
    SELECT productId, quantity, price, createdAt
    FROM Orders
    ORDER BY createdAt DESC
  `);
  return results;
};
