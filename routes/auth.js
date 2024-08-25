const express = require("express");
const router = express.Router();

const {
  registerHandler,
  loginHandler,
  logoutHandler,
} = require("../controllers/auth");

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", logoutHandler); // Add this line

module.exports = router;
