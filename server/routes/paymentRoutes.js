import express from "express";
import { getAllPayments, recordPayment } from "../controllers/paymentController.js";


const router = express.Router();
router.post('/',recordPayment)
router.get('/',getAllPayments)
export default router;
