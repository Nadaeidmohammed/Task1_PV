import Router from "express";
import { getRecommendations } from "./gemini.controller.js";

const router = Router();

router.get("/recommendations", getRecommendations);

export default router;
