import express from "express";
import { getCompanies, getCompany, createCompany, updateCompany } from "../controllers/companies.js";

const router = express.Router();

router.get('/', getCompanies);
router.post('/', createCompany);
router.get('/:id', getCompany);
router.patch('/:id', updateCompany);

export default router;