const axios = require("axios");
const express = require("express");
const router = express.Router();

// Random app IDs
const arr = [271590];

router.get("/", async (req, res) => {
  try {
    // Fetch the list of apps
    const response = await axios.get(
      "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json"
    );
    const appList = response.data.applist.apps;

    // Filter out the app IDs we are interested in
    const appIds = arr.filter((id) => appList.some((app) => app.appid === id));

    // Fetch details for each app ID
    const detailsPromises = appIds.map((id) =>
      axios.get(`https://store.steampowered.com/api/appdetails?appids=${id}`)
    );

    const detailsResponses = await Promise.all(detailsPromises);

    // Combine the results
    const appDetails = detailsResponses.map((response) => response.data);
    appDetails.forEach((app) => {
      const appId = Object.keys(app)[0];
      if (app[appId].success) {
        app[appId] = app[appId].data;
      }
    });

    // Send the detailed app information to the frontend
    res.json(appDetails);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
