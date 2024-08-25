const express = require("express");
const router = express.Router();

const {
  getGameHandler,
  ratingHandler,
  createCommentHandler,
  getRatingHandler,
} = require("../controllers/game");

router.get("/game/:id", getGameHandler);
router.post("/game/:id/comment", createCommentHandler);
router.post("/game/:id/rating", ratingHandler);
router.get("/game/:id/rating", getRatingHandler);

module.exports = router;
