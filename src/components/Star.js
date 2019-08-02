import React from 'react';

const Star = ({ color, id }) => {
  return (
    <svg
      id={`star-${id}`}
      width="20"
      height="20"
      viewBox="0 0 20 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id={`star-${id}`}
        d="M10 0.252625L12.3608 7.89999H20L13.8192 12.6272L16.18 20.2746L10 15.5482L3.81917 20.2746L6.18 12.6272L0 7.89999H7.63917L10 0.252625Z"
        fill={color}
      />
    </svg>
  );
};

export default Star;
