import React, { useState } from "react";

const StarRating = ({ ratingValue }) => {
  const [rating, setRating] = useState(0);

  //   const handleRatingChange = (value) => {
  //     setRating(value);
  //   };

  return (
    <div className="star-rating flex flex-row">
      {[...Array(5)].map((_, index) => {
        const Value = index + 1;
        return (
          <label
            key={index}
            className="cursor-pointer"
            // onClick={() => handleRatingChange(ratingValue)}
          >
            <input
              type="radio"
              name="rating"
              value={Value}
              className="hidden"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 fill-current ${
                Value <= ratingValue ? "text-yellow-500" : "text-gray-300"
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2l2.3 7.4h7.7l-6 4.7 2.3 7.4-6-4.7-6 4.7 2.3-7.4-6-4.7h7.7z" />
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
