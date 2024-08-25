const express = require("express");
const router = express.Router();

const { getGameHandler, commentHandler } = require("../controllers/game");

router.get("/game/:id", getGameHandler);
router.post("/game/:id", commentHandler);

module.exports = router;
