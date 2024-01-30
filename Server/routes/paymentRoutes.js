import express from "express";
import { checkout, paymentverification } from "../controllers/paymentController.js";
// import paymentLink from "razorpay/dist/types/paymentLink.js";

const router =express.Router();

router.route("/checkout").post(checkout);
router.route("paymentverification").post(paymentverification);

export default router;