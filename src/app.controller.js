import { connectDB, syncTables } from "./DB/connection.js";
import globalErrorHandler from "./utils/errorHandling/globalErrorHandler.js";
import orderRouter from "./Modules/Order/order.controller.js"
import analyticsRouter from "./Modules/analytics/analytics.controller.js"
import weatherRouter from "./Modules/Weather/weather.controller.js"
import geminiRoutes from "./Modules/Gemini/gimini.routes.js";

import cors from "cors"
import Drink from "./DB/Models/Drink.model.js";

export const bootstrab=async(app,express)=>{

   await connectDB();
   await syncTables();
   app.use(cors())
    app.use(express.json());
    app.use("/order",orderRouter)
    app.use("/analytics",analyticsRouter)
    app.use("/weather",weatherRouter)

    app.use("/api/gemini", geminiRoutes);

    const count = await Drink.count();
    if (count === 0) {
      await Drink.bulkCreate([
        { name: "Iced Coffee", base_price: 30, category: "cold" },
        { name: "Lemon Juice", base_price: 25, category: "cold" },
        { name: "Hot Coffee", base_price: 20, category: "hot" },
        { name: "Tea", base_price: 15, category: "hot" },
      ]);
      console.log("Drinks inserted");
    }

    app.use((req, res) => {
     res.status(404).json({ message: 'Not Found Handler!' });
   });

   app.use(globalErrorHandler);
}