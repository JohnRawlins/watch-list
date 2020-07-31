import React from "react";
import VideoListPlaceholder from "./VideoListPlaceholder";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import "../css/popular-videos.scss";

SwiperCore.use(Navigation);

const PopularVideos = ({ popularVideos, isLoading }) => {
  const swiperBreakPoints = {
    768: { slidesPerView: 4, slidesPerGroup: 4 },
    880: { slidesPerView: 5, slidesPerGroup: 5 },
    1920: { slidesPerView: 7, slidesPerGroup: 7, spaceBetween: 40 },
  };

  if (popularVideos) {
    popularVideos = popularVideos.reduce((videos, video) => {
      if (video) {
        videos.push(
          <SwiperSlide key={video.id} tag="li">
            <Link
              to={`/video-profile/${video.title.replace("?", "")}/${
                video.imdbID
              }`}
              className="popular-video"
            >
              <img
                className="popular-video__poster"
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${video.poster_path}`}
                alt="Video Poster"
              />
              <span className="popular-video__title">{video.title}</span>
            </Link>
          </SwiperSlide>
        );
      }
      return videos;
    }, []);
  }
  return isLoading ? (
    <VideoListPlaceholder />
  ) : (
    <div className="popular-videos-container">
      <section className="video-section">
        <h2 className="video-section__title">Action</h2>
        <Swiper
          wrapperTag="ul"
          slidesPerView={3}
          spaceBetween={15}
          slidesPerGroup={3}
          freeMode={true}
          navigation
          breakpoints={swiperBreakPoints}
        >
          {popularVideos}
        </Swiper>
      </section>
      <section className="video-section">
        <h2 className="video-section__title">Comedy</h2>
        <Swiper
          wrapperTag="ul"
          slidesPerView={3}
          spaceBetween={15}
          slidesPerGroup={3}
          freeMode={true}
          navigation
          breakpoints={swiperBreakPoints}
        >
          {popularVideos}
        </Swiper>
      </section>
      <section className="video-section">
        <h2 className="video-section__title">Science Fiction</h2>
        <Swiper
          wrapperTag="ul"
          slidesPerView={3}
          spaceBetween={15}
          slidesPerGroup={3}
          freeMode={true}
          navigation
          breakpoints={swiperBreakPoints}
        >
          {popularVideos}
        </Swiper>
      </section>
      <section className="video-section">
        <h2 className="video-section__title">Horror</h2>
        <Swiper
          wrapperTag="ul"
          slidesPerView={3}
          spaceBetween={15}
          slidesPerGroup={3}
          freeMode={true}
          navigation
          breakpoints={swiperBreakPoints}
        >
          {popularVideos}
        </Swiper>
      </section>
      <section className="video-section">
        <h2 className="video-section__title">Animation</h2>
        <Swiper
          wrapperTag="ul"
          slidesPerView={3}
          spaceBetween={15}
          slidesPerGroup={3}
          freeMode={true}
          navigation
          breakpoints={swiperBreakPoints}
        >
          {popularVideos}
        </Swiper>
      </section>
      <section className="video-section">
        <h2 className="video-section__title">Romance</h2>
        <Swiper
          wrapperTag="ul"
          slidesPerView={3}
          spaceBetween={15}
          slidesPerGroup={3}
          freeMode={true}
          navigation
          breakpoints={swiperBreakPoints}
        >
          {popularVideos}
        </Swiper>
      </section>
    </div>
  );
};

export default PopularVideos;
