const axios = require("axios");
const Comment = require("../models/comment");

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

module.exports = {
  getGameHandler,
  createCommentHandler,
};
