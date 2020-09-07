const axios = require("axios");
const PORT = process.env.PORT || 5000;

const getNewReleases = async () => {
  try {
    const websiteResponse = await axios.get(
      `http://localhost:${PORT}/api/search/new-releases`
    );

    console.log(websiteResponse.data);
  } catch (error) {
    console.log(error);
  }
};

getNewReleases();
