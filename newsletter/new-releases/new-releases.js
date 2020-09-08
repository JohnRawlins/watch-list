const axios = require("axios");
const FormData = require("form-data");
const cheerio = require("cheerio");
const nodemailer = require("nodemailer");
const mailgunTransport = require("nodemailer-mailgun-transport");
const handlebars = require("handlebars");
const fileSystem = require("fs");
const path = require("path");
let mailgunApiKey = process.env.MAILGUN_API_KEY;
let mailgunDomain = process.env.MAILGUN_DOMAIN;
let emailFrom = process.env.EMAIL_FROM;
let emailTo = process.env.EMAIL_TO;

if (
  !process.env.MAILGUN_API_KEY ||
  !process.env.MAILGUN_DOMAIN ||
  !process.env.EMAIL_TO ||
  !process.env.EMAIL_FROM
) {
  console.log("MISSING ENVIRONMENT VARIABLES \n\n");
  require("dotenv-extended").load({ path: "../../.env" });
  mailgunApiKey = process.env.MAILGUN_API_KEY;
  mailgunDomain = process.env.MAILGUN_DOMAIN;
  emailFrom = process.env.EMAIL_FROM;
  emailTo = process.env.EMAIL_TO;
}

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
  const newReleases = [];
  try {
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
    return newReleases;
  } catch (error) {
    console.error(error);
    return newReleases;
  }
};

const sendEmail = async () => {
  const emailTemplateSource = fileSystem.readFileSync(
    path.join(__dirname, "/template.hbs"),
    "utf-8"
  );

  const mailgunAuth = {
    auth: {
      api_key: mailgunApiKey,
      domain: mailgunDomain,
    },
  };

  const smtpTransport = nodemailer.createTransport(
    mailgunTransport(mailgunAuth)
  );

  const template = handlebars.compile(emailTemplateSource);

  const movieReleases = await getNewReleases();

  console.log(movieReleases)

  const emailContent = template({ movieReleases });

  const emailOptions = {
    from: emailFrom,
    to: emailTo,
    subject: "Test Email",
    html: emailContent,
  };

  smtpTransport.sendMail(emailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Successfully sent email");
    }
  });
};

module.exports = sendEmail;
