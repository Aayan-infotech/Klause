import { Router } from "express";
import { validateRequest } from "../../middlewares/validation.middleware.js";
import { authenticatedUser } from "../../middlewares/adminAuth.middleware.js";
import { restaurantTypeValidationSchema, updateRestaurantTypeValidationSchema } from "../../validators/restaurantValidator.js";
import {
  getRestaurantTypes,
  saveRestuarantType,
  updateRestaurantType,
} from "../../controllers/admin/restaurant.controller.js";

const router = Router();

router.post(
  "/type",
  authenticatedUser,
  validateRequest(restaurantTypeValidationSchema),
  saveRestuarantType
);
router.get("/type", authenticatedUser, getRestaurantTypes);
router.put(
  "/type/:id",
  authenticatedUser,
  validateRequest(updateRestaurantTypeValidationSchema),
  updateRestaurantType
);

export default router;
