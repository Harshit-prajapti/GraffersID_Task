import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const handleMouseEnter = (index) => {
        if (!readOnly && onRatingChange) {
            setHoverRating(index);
        }
    };

    const handleMouseLeave = () => {
        if (!readOnly && onRatingChange) {
            setHoverRating(0);
        }
    };

    const handleClick = (index) => {
        if (!readOnly && onRatingChange) {
            onRatingChange(index);
        }
    };

    return (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                const isFilled = readOnly
                    ? starValue <= fullStars
                    : starValue <= (hoverRating || rating);

                const isHalf = readOnly && !isFilled && starValue === Math.ceil(rating) && hasHalfStar;

                return (
                    <button
                        key={i}
                        type="button"
                        className={`text-2xl focus:outline-none transition-colors ${isFilled || isHalf ? 'text-yellow-400' : 'text-gray-300'
                            } ${!readOnly ? 'cursor-pointer hover:scale-110 transform duration-150' : 'cursor-default'}`}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(starValue)}
                        disabled={readOnly}
                    >
                        {isHalf ? '⯨' : '★'}
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
