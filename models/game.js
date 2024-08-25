const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  gameId: {
    type: String,
  },
  rating: {
    type: Array,
    default: [],
  },
});

const Game = mongoose.model("Game", GameSchema);
module.exports = Game;
