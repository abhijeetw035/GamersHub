const axios = require("axios");
const Comment = require("../models/comment");
const Rating = require("../models/rating");

const createCommentHandler = async (req, res) => {
  const { content, gameId, createdBy } = req.body;
  console.log(content, gameId, createdBy);

  try {
    const newComment = new Comment({
      content,
      gameId,
      createdBy,
    });

    await newComment.save();
    res.status(201).send("Comment created successfully");
  } catch (error) {
    console.error("Error creating comment:", error.message);
    res.status(500).send("Error creating comment");
  }
};

const getGameHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch comments for the specific game ID
    const comments = await Comment.find({ gameId: id });
    // console.log(comments);

    // Fetch details for the specific app ID
    const response = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${id}`
    );

    // Extract the app details from the response
    const appDetails = response.data[id].data;
    // console.log(appDetails);

    // You can check if the response was successful and further process the data if needed
    res.json({ comments, appDetails }); // Send the detailed app information to the frontend
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Error fetching data");
  }
};

// Function to calculate the average of an array of numbers
const calculateAverage = (arr) => {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return arr.length ? sum / arr.length : 0;
};

const ratingHandler = async (req, res) => {
  const { gameId, ratingValue } = req.body;

  try {
    // Find the rating document by gameId
    let ratingDoc = await Rating.findOne({ gameId });

    if (!ratingDoc) {
      // If gameId doesn't exist, create a new document with the gameId and the rating array
      ratingDoc = new Rating({
        gameId,
        rating: [ratingValue],
      });
    } else {
      // Push the new rating value into the rating array if the document exists
      ratingDoc.rating.push(ratingValue);
    }

    // Save the document (whether new or updated)
    await ratingDoc.save();

    // Calculate the average rating
    const averageRating = calculateAverage(ratingDoc.rating);

    // Return the average rating
    return res.status(200).json({ averageRating });
  } catch (error) {
    console.error("Error rating the game:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getRatingHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the rating document by gameId
    const ratingDoc = await Rating.findOne({ gameId : id });

    if (!ratingDoc) {
      return res.status(200).json({ averageRating: 0 });
    }

    // Calculate the average rating
    const averageRating = calculateAverage(ratingDoc.rating);

    // Return the average rating
    return res.status(200).json({ averageRating });
  } catch (error) {
    console.error("Error fetching rating:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getGameHandler,
  ratingHandler,
  createCommentHandler,
  getRatingHandler,
};
