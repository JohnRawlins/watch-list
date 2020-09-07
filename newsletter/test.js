const axios = require("axios");
const FormData = require("form-data");
const cheerio = require("cheerio");

const createNewReleasesFormData = (formData) => {
  formData.append("with_ott_providers", "384|43|37");
  formData.append("certification", "PG-13|R");
  formData.append("certification_country", "US");
  formData.append("ott_region", "US");
  formData.append("page", "1");
  formData.append("sort_by", "primary_release_date.desc");
  formData.append("vote_average.lte", "10");
  formData.append("with_original_language", "en");
  formData.append("with_runtime.gte", "0");
  formData.append("with_runtime.lte", "400");
  formData.append("language", "en-US");
};

const getNewReleases = async () => {
  try {
    const newReleases = [];
    const formData = new FormData();
    createNewReleasesFormData(formData);
    const websiteResponse = await axios.post(
      "https://www.themoviedb.org/discover/movie",
      formData,
      { responseType: "text", headers: formData.getHeaders() }
    );

    const $ = cheerio.load(websiteResponse.data);

    $(".card").each(function (i, elem) {
      const movieTitle = $(this).find("h2").text();
      let moviePosterSrc = $(this).find(".poster").data("src");
      if (movieTitle && moviePosterSrc) {
        moviePosterSrc = "https:" + moviePosterSrc;
        newReleases.push({ movieTitle, moviePosterSrc });
      }
    });
    console.log(newReleases);
  } catch (error) {
    console.error(error);
  }
};

getNewReleases();
