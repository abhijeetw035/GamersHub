const axios = require("axios");

const commentHandler = async (req, res) => {
  const { id } = req.params;
  res.send("Comment posted on game with ID: " + id);
};

const getGameHandler = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch details for the specific app ID
    const response = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${id}`
    );

    // Extract the app details from the response
    const appDetails = response.data;

    // You can check if the response was successful and further process the data if needed
    const appId = Object.keys(appDetails)[0];
    if (appDetails[appId].success) {
      const appData = appDetails[appId].data;
      // console.log(appData); // Log the app data for debugging
      res.json(appData); // Send the detailed app information to the frontend
    } else {
      res.status(404).send("App not found");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Error fetching data");
  }
};

module.exports = {
  getGameHandler,
  commentHandler,
};
