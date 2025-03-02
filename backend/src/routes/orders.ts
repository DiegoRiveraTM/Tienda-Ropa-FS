import express from "express";
import { createOrder } from "../controllers/ordersController";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();

router.post("/", authenticateUser, createOrder);

export default router;