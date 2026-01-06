import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCompanyById, fetchReviews, getAverageRating } from '../api/api';
import ReviewCard from '../components/ReviewCard';
import LoadingSpinner from '../components/LoadingSpinner';
import StarRating from '../components/StarRating';

const CompanyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        loadCompanyData();
    }, [id]);

    useEffect(() => {
        if (company) {
            loadReviews();
        }
    }, [sortBy, company]);

    const loadCompanyData = async () => {
        setLoading(true);
        try {
            const [companyData, ratingData] = await Promise.all([
                fetchCompanyById(id),
                getAverageRating(id),
            ]);
            setCompany(companyData);
            setAverageRating(ratingData.averageRating);
            setTotalReviews(ratingData.totalReviews);
        } catch (error) {
            console.error('Error loading company:', error);
            alert('Error loading company details');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const loadReviews = async () => {
        try {
            const data = await fetchReviews(id, sortBy);
            setReviews(data);
        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!company) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">


                {/* Company Info */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <div className="flex items-start gap-6">
                        <img
                            src={company.logo || 'https://via.placeholder.com/120?text=Logo'}
                            alt={company.name}
                            className="w-32 h-32 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <div className='flex justify-between items-center'>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    {company.name}
                                </h1>
                                <p className="text-gray-500 mb-4">
                                    Founded: {new Date(company.foundedOn).toLocaleDateString()}
                                </p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className="text-gray-600 mb-2">
                                    {company.location} • {company.city}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <div className='flex flex-row gap-2'>
                                    <div className="text-xl font-bold text-gray-900 mt-1">
                                        {averageRating.toFixed(1)}
                                    </div>
                                    <StarRating rating={Math.round(averageRating)} readonly />
                                </div>

                                <button
                                    onClick={() => navigate(`/company/${id}/add-review`)}
                                    className="btn-primary ml-0 cursor-pointer"
                                >
                                    + Add Review
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4 text-gray-200" />
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="text-sm text-gray-500 pb-4">
                            {totalReviews} {totalReviews === 1 ? 'Result Found' : 'Results Found'}
                        </div>
                        {reviews.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg mb-4">
                                    No reviews yet. Be the first to review!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <ReviewCard
                                        key={review._id}
                                        review={review}
                                        onLike={loadReviews}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}

            </div>
        </div>
    );
};

export default CompanyDetail;
