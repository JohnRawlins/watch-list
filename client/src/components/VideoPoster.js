import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/popular-videos.scss";

const VideoPoster = ({ id, posterPath, title }) => {
  const [posterLoading, setPosterLoading] = useState(true);

  const posterFadeIn = posterLoading ? { opacity: 0 } : { opacity: 1 };

  return (
    <Link
      className="popular-video-wrapper"
      to={`/video-profile/${title.replace("?", "")}/${id}`}
    >
      <div className="popular-video">
        <img
          style={posterFadeIn}
          className="popular-video__poster"
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`}
          alt="Video Poster"
          onLoad={() => {
            setPosterLoading(false);
          }}
        />
      </div>
      <span className="popular-video__title">{title}</span>
    </Link>
  );
};

export default VideoPoster;
