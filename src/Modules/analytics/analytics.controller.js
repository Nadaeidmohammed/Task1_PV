
import asyncHandler from "../../utils/errorHandling/asyncHandler.js";
import * as analyticsService from "./analytics.service.js"


import { Router } from "express";

const router=Router();

router.get("/",asyncHandler(analyticsService.getAnalytics))

export default router;
