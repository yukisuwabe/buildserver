import express from "express";
import { getBadges, createBadge, updateBadge, getBadge } from "../controllers/badges.js";

const router = express.Router();

router.get('/', getBadges);
router.post('/', createBadge);
router.get('/:id', getBadge)
router.patch('/:id', updateBadge);

export default router;