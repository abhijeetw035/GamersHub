const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  gameId: {
    type: String,
  },
  rating: {
    type: Array,
    default: [],
  },
});

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
