import asyncHandler from "../../utils/errorHandling/asyncHandler.js";
import * as orderService from "./order.service.js"


import { Router } from "express";

const router=Router();

router.post("/addOrder",asyncHandler(orderService.createOrder))

export default router;
