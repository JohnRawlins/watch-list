import React, { useState } from "react";
import Slider from "react-slick";
import defaultVideoBackdrop from "../img/video-search-background-1920w.jpg";
import { Link } from "react-router-dom";
import "../css/featured-content.scss";

const FeaturedContent = ({ featuredContent }) => {
  const [featureBackdropError, setFeatureBackdropError] = useState(false);
  const sliderBreakPoints = [
    {
      breakpoint: 880,
      settings: {
        centerMode: false,
        slidesToShow: 1,
      },
    },
  ];
  const settings = {
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: sliderBreakPoints,
  };
  if (featuredContent) {
    featuredContent = featuredContent.map((content) => {
      return (
        <li className="featured-content" key={content.id}>
          <Link
            to={`/video-profile/${content.title.replace("?", "")}/${
              content.id
            }`}
          >
            <img
              className="featured-content__backdrop"
              src={
                featureBackdropError
                  ? defaultVideoBackdrop
                  : `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${content.poster_path}`
              }
              alt=""
              onError={() => setFeatureBackdropError(true)}
            />
            <div className="featured-content-overlay">
              <h2 className="featured-content-overlay__title">
                {content.title}
              </h2>
            </div>
          </Link>
        </li>
      );
    });
  }
  return (
    <ul className="featured-content-container">
      <Slider {...settings}>{featuredContent}</Slider>
    </ul>
  );
};

export default FeaturedContent;
