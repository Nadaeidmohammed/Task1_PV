import { getWSS } from "../WebSocket/index.js"; 
import { Order } from "../../DB/Models/Order.model.js"
import { getAnalyticsData } from "../analytics/analytics.utils.js";

export const createOrder = async (req, res, next) => {
  const { productId, quantity, price, date } = req.body;

  if (!productId || !quantity || !price) {
    return res.status(400).json({ 
      success: false,
      error: "Enter productId, quantity, and price"
    });
  }

    const order = await Order.create({
      productId,
      quantity,
      price,
      date: date || new Date() 
    });

    const analytics = await getAnalyticsData();

    const wss = getWSS();
    if (wss) {
      const updateData = JSON.stringify({
        order,
        analytics
      });

      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(updateData);
        }
      });
    }

    res.status(201).json({
      success: true,
      data: {
        order,
        analytics
      }
    });

  
};
