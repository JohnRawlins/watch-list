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

// Dev Environment Only
if (
  !process.env.MAILGUN_API_KEY ||
  !process.env.MAILGUN_DOMAIN ||
  !process.env.EMAIL_TO ||
  !process.env.EMAIL_FROM
) {
  require("dotenv-extended").load({ path: "../../.env" });
  mailgunApiKey = process.env.MAILGUN_API_KEY;
  mailgunDomain = process.env.MAILGUN_DOMAIN;
  emailFrom = process.env.EMAIL_FROM;
  emailTo = process.env.EMAIL_TO;
}

const createNewReleasesFormData = (formData) => {
  formData.append("certification", "PG-13|R");
  formData.append("certification_country", "US");
  formData.append("page", "1");
  formData.append("sort_by", "popularity.desc");
  formData.append("vote_average.lte", "10");
  formData.append("with_original_language", "en");
  formData.append("with_runtime.gte", "0");
  formData.append("with_runtime.lte", "400");
  formData.append("language", "en-US");
};

const getTodaysDate = () => {
  const format = { year: "numeric", month: "short", day: "numeric" };
  return new Date().toLocaleDateString("en-US", format);
};

const getNewReleases = async () => {
  try {
    const newReleases = [];
    const newReleasesTableData = {};
    const formData = new FormData();
    createNewReleasesFormData(formData);
    const websiteResponse = await axios.post(
      "https://www.themoviedb.org/discover/movie",
      formData,
      { responseType: "text", headers: formData.getHeaders() }
    );

    const $ = cheerio.load(websiteResponse.data);

    $(".card").each(function (index, elem) {
      const movieTitle = $(this).find("h2").text();
      let moviePosterSrc = $(this).find(".poster").data("src");
      if (movieTitle && moviePosterSrc && index < 12) {
        moviePosterSrc = "https:" + moviePosterSrc;
        newReleases.push({ movieTitle, moviePosterSrc });
      }
    });

    if (newReleases.length > 0) {
      let rowData = [];
      let count = 0;
      for (const [index, value] of newReleases.entries()) {
        rowData.push(value);
        count = index + 1;
        if (count % 3 === 0) {
          newReleasesTableData[`row${count}`] = rowData;
          rowData = [];
        }
      }
    }
    return newReleasesTableData;
  } catch (error) {
    console.error(error);
  }
};

const sendEmail = async () => {
  try {
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

    if (!movieReleases) {
      throw new Error("Unable to obtain movie releases");
    }

    const emailContent = template(movieReleases);

    const emailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: `Popular Movie Releases ${getTodaysDate()}`,
      html: emailContent,
    };

    smtpTransport.sendMail(emailOptions, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Successfully sent email");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendEmail;
