import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const CompanyCard = ({ company }) => {
    const navigate = useNavigate();

    const dateLabel = company.dateLabel || (company.foundedOn ? `Founded on ${new Date(company.foundedOn).toLocaleDateString()}` : '');
    const rating = company.rating || 0;
    const reviewsCount = company.reviews || 0;
    const address = company.address || `${company.location || ''} ${company.city || ''}`.trim();

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex space-x-4">
                    {/* Logo */}
                    <img className='w-24 h-24 rounded-lg object-cover overflow-hidden' src={company.logo} alt="" />

                    {/* Company Info */}
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {company.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            {address}
                        </p>
                        <div className="flex items-center space-x-3">
                            <span className="text-lg font-semibold">{Math.floor(rating)} rating</span>
                            <StarRating rating={rating} />
                            <span className="text-sm text-gray-600">{reviewsCount} Reviews</span>
                        </div>
                    </div>
                </div>

                {/* Right Side Info */}
                <div className="text-right">
                    <p className="text-xs text-gray-500 mb-3">{dateLabel}</p>
                    <button
                        onClick={() => navigate(`/company/${company._id}`)}
                        className="bg-gray-900 hover:bg-gray-800 cursor-pointer text-white px-6 py-2 mt-6 rounded-md text-sm font-medium transition-colors"
                    >
                        Detail Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCard;
