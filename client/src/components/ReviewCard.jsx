import React from 'react';
import StarRating from './StarRating';

const ReviewCard = ({ review }) => {
    const textIcon = review.fullName.charAt(0).toUpperCase();

    return (
        <div className="card p-2 animate-fade-in">
            <div className="flex gap-2 items-start mb-3">
                <div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold">
                        {textIcon}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-900">{review.fullName}</h4>
                    <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <StarRating rating={review.rating} readonly />
            </div>


            <p className="text-gray-700 mb-4">{review.reviewText}</p>
        </div>
    );
};

export default ReviewCard;
