import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createReview, fetchCompanyById } from '../api/api';
import StarRating from '../components/StarRating';
import { ArrowLeft, Star } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const AddReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        subject: '',
        reviewText: '',
        rating: 0,
    });

    useEffect(() => {
        loadCompany();
    }, [id]);

    const loadCompany = async () => {
        try {
            const data = await fetchCompanyById(id);
            setCompany(data);
        } catch (error) {
            console.error('Error loading company:', error);
            navigate('/');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRatingChange = (rating) => {
        setFormData({
            ...formData,
            rating,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.rating === 0) {
            alert('Please select a rating');
            return;
        }

        setLoading(true);

        try {
            await createReview({
                ...formData,
                companyId: id,
            });
            alert('Review added successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error creating review:', error);
            const message = error.response?.data?.message || 'Error adding review. Please try again.';
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    if (!company) {
        return <div className="min-h-screen bg-gray-50 py-8 flex justify-center"><LoadingSpinner /></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow-sm rounded-lg">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Write a Review
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Share your experience with {company.name}
                        </p>
                    </div>

                    <div className="px-6 py-6">
                        <div className="space-y-5">
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                                    Rating <span className="text-red-500">*</span>
                                </label>
                                <div className="flex justify-center">
                                    <StarRating
                                        rating={formData.rating}
                                        onRatingChange={handleRatingChange}
                                        readOnly={false}
                                    />
                                </div>
                                {formData.rating > 0 && (
                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                        {formData.rating} out of 5 stars
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Review Subject <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Brief summary of your review"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Review <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="reviewText"
                                    required
                                    value={formData.reviewText}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Share your detailed experience..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReview;