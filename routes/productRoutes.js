import { Router } from "express";
const router = Router();

import { signup, verifySignup, getCurrentUser, signin } from "../controllers/authController";
import authorization from "../middlewares/authorization";

router.post("/v1/products",authorization, addProduct);
router.get("/v1/products", getProducts);
router.get("/v1/products/:id", findOneProduct);
router.patch("/v1/products/:id",authorization, updateProduct);
router.post("/v1/category",authorization, addCategory);
router.patch("/v1/category/:id",authorization, updateCategory);

export default router;
