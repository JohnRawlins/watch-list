import React from "react";
import VideoListPlaceholder from "./VideoListPlaceholder";
import VideoPoster from "./VideoPoster";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularVideos = ({ popularVideos, isLoading }) => {
  const sliderBreakPoints = [
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 880,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 4000,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
      },
    },
  ];

  if (popularVideos) {
    popularVideos = popularVideos.reduce((genreList, currentGenre) => {
      const genreVideos = [];
      if (currentGenre) {
        for (const video of currentGenre.videos) {
          genreVideos.push(
            <VideoPoster
              key={video.id}
              id={video.id}
              posterPath={video.poster_path}
              title={video.title}
            />
          );
        }
      }
      const genreData = {
        genreName: currentGenre.genreName,
        videos: genreVideos,
      };
      genreList[
        currentGenre.genreName.toLowerCase().replace(/\s/g, "")
      ] = genreData;
      return genreList;
    }, {});
  }
  const settings = {
    speed: 500,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: sliderBreakPoints,
  };

  return isLoading ? (
    <VideoListPlaceholder />
  ) : (
    popularVideos && (
      <div className="popular-videos-container">
        <section className="video-section">
          <h2 className="video-section__name">
            {popularVideos.popular.genreName}
          </h2>
          <Slider {...settings}>{popularVideos.popular.videos}</Slider>
        </section>
        <section className="video-section">
          <h2 className="video-section__name">
            {popularVideos.animation.genreName}
          </h2>
          <Slider {...settings}>{popularVideos.animation.videos}</Slider>
        </section>
        <section className="video-section">
          <h2 className="video-section__name">
            {popularVideos.horror.genreName}
          </h2>
          <Slider {...settings}>{popularVideos.horror.videos}</Slider>
        </section>
        <section className="video-section">
          <h2 className="video-section__name">
            {popularVideos.action.genreName}
          </h2>
          <Slider {...settings}>{popularVideos.action.videos}</Slider>
        </section>
        <section className="video-section">
          <h2 className="video-section__name">
            {popularVideos.comedy.genreName}
          </h2>
          <Slider {...settings}>{popularVideos.comedy.videos}</Slider>
        </section>
        <section className="video-section">
          <h2 className="video-section__name">
            {popularVideos.sciencefiction.genreName}
          </h2>
          <Slider {...settings}>{popularVideos.sciencefiction.videos}</Slider>
        </section>
        <section className="video-section">
          <h2 className="video-section__name">
            {popularVideos.thriller.genreName}
          </h2>
          <Slider {...settings}>{popularVideos.thriller.videos}</Slider>
        </section>
        <section className="video-section">
          <h2 className="video-section__name">
            {popularVideos.romance.genreName}
          </h2>
          <Slider {...settings}>{popularVideos.romance.videos}</Slider>
        </section>
      </div>
    )
  );
};

export default PopularVideos;
