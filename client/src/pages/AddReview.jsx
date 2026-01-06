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
            navigate('/'); // Navigate to home or company detail
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-purple-700 mb-6 transition-colors"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Companies
            </button> */}

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-purple-600 px-8 py-6 text-white">
                    <h1 className="text-2xl font-bold">Write a Review</h1>
                    <p className="mt-1 opacity-90">Share your experience with <span className="font-semibold">{company.name}</span></p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            {/* Rating Section - Prominent */}
                            <div className="bg-purple-50 p-6 rounded-lg text-center border border-purple-100">
                                <label className="block text-lg font-medium text-purple-900 mb-2">
                                    How would you rate your experience?
                                </label>
                                <div className="flex justify-center">
                                    <StarRating
                                        rating={formData.rating}
                                        onRatingChange={handleRatingChange}
                                        readOnly={false}
                                    />
                                </div>
                                <p className="text-sm text-purple-700 mt-2">
                                    {formData.rating > 0 ? `You selected ${formData.rating} stars` : 'Select stars above'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Review Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="Brief summary of your review"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Review *
                                </label>
                                <textarea
                                    name="reviewText"
                                    required
                                    value={formData.reviewText}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Tell us about your experience in detail..."
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                            >
                                {loading ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;
