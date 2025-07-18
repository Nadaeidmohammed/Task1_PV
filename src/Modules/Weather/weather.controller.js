import { Router } from "express";
import { weatherBasedSuggestion } from "./weather-suggestion.service.js";
import asyncHandler from "../../utils/errorHandling/asyncHandler.js";
import { adjustDrinkPrices } from "./priceSuggestion.service.js";

const router=Router()

router.get("/weather-suggestion", asyncHandler(weatherBasedSuggestion));
router.get("/dynamic-prices", asyncHandler(adjustDrinkPrices));


export default router;