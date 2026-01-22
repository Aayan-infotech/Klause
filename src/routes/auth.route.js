import { Router } from "express";
import {
  signup,
  verifyOtp,
  resendOTP,
  joinAs,
  createCredential,
  usernameAvailability,
} from "../controllers/auth.controller.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import {
  createCredentialsValidationSchema,
  // loginValidationSchema,
  userValidationSchema,
} from "../validators/userValidator.js";
import { authenticatedUser } from "../middlewares/auth.middleware.js";
// import { checkVersion } from "../middlewares/checkVersion.js";


const router = Router();

router.route("/signup").post(validateRequest(userValidationSchema), signup);
router.post("/verify-otp",verifyOtp);
router.post("/resend-otp", resendOTP);
router.post("/joinAs",authenticatedUser,joinAs);
router.post("/create-credientials", authenticatedUser, validateRequest(createCredentialsValidationSchema),createCredential);
router.get('/username-availability/:username', authenticatedUser, usernameAvailability);
router.post('/save-owner-details',authenticatedUser,validateRequest());

export default router;
