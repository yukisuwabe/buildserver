import express from "express";
import { getReward, createReward } from "../controllers/rewards.js";

const router = express.Router();

router.get('/', getReward);
router.post('/', createReward);

export default router;