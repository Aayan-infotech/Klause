import { Router } from "express";
import authRoutes from "./adminAuth.route.js";
import restaurantRoutes from "./restaurant.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/restaurant",restaurantRoutes);

export default router;
