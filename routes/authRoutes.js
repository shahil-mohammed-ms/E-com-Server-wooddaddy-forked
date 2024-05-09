import { Router } from "express";
const router = Router();

import { signup, verifySignup, getCurrentUser, signin } from "../controllers/authController";
import authorization from "../middlewares/authorization";

router.post("/v1/user/register", signup);
router.post("/v1/user/verify", verifySignup);
router.post("/v1/user/verifysecret", verifySerialNumber);
router.post("/v1/user/login", signin);
router.get("/v1/user", authorization, getCurrentUser);

export default router;
