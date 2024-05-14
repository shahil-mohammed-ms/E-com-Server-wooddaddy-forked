const { Router } = require('express');
const router = Router();

const {
  signup,
  verifySignup,
  getCurrentUser,
  signin
} = require("../controllers/authController");
const authorization = require("../middlewares/authorization");

router.post("/v1/user/register", signup);
router.post("/v1/user/verify", verifySignup);
router.post("/v1/user/login", signin);
router.get("/v1/user", authorization, getCurrentUser);

module.exports = router;
