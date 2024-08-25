const express = require("express");
const router = express.Router();

const {
  getGameHandler,
  getCommentHandler,
  createCommentHandler,
} = require("../controllers/game");

router.get("/game/:id", getGameHandler);
router.post("/game/:id/comment", createCommentHandler);

module.exports = router;
