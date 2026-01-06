
import Review from '../models/Review.js';
import Company from '../models/Company.js';
import mongoose from 'mongoose';

export const getReviewsByCompanyId = async (req, res) => {
    try {
        console.log("Fetching reviews for company:", req.params.companyId);
        const { companyId } = req.params;
        const { sortBy } = req.query;

        const company = await Company.findById(companyId);
        if (!company) {
            console.log("Company not found for reviews");
            return res.status(404).json({ message: 'Company not found' });
        }

        let sort = { createdAt: -1 };
        if (sortBy === 'rating') {
            sort = { rating: -1, createdAt: -1 };
        } else if (sortBy === 'relevance') {
            sort = { likes: -1, createdAt: -1 };
        }

        const reviews = await Review.find({ companyId }).sort(sort);
        console.log(`Found ${reviews.length} reviews`);
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};

export const getReviewStats = async (req, res) => {
    try {
        console.log("Calculating review stats for company:", req.params.companyId);
        const { companyId } = req.params;

        const result = await Review.aggregate([
            { $match: { companyId: new mongoose.Types.ObjectId(companyId) } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        if (result.length === 0) {
            return res.json({ averageRating: 0, totalReviews: 0 });
        }

        res.json({
            averageRating: Math.round(result[0].averageRating * 10) / 10,
            totalReviews: result[0].totalReviews
        });
    } catch (error) {
        console.error("Error calculating average rating:", error);
        res.status(500).json({ message: 'Error calculating average rating', error: error.message });
    }
};

export const createReview = async (req, res) => {
    try {
        console.log("Creating new review:", req.body);
        const { companyId, fullName, subject, reviewText, rating } = req.body;

        if (!fullName || !subject || !reviewText || !rating) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const review = new Review({
            companyId,
            fullName,
            subject,
            reviewText,
            rating
        });

        const savedReview = await review.save();
        console.log("Review created successfully:", savedReview._id);
        res.status(201).json(savedReview);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(400).json({ message: 'Error creating review', error: error.message });
    }
};

export const likeReview = async (req, res) => {
    try {
        console.log("Liking review:", req.params.id);
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json(review);
    } catch (error) {
        console.error("Error liking review:", error);
        res.status(500).json({ message: 'Error liking review', error: error.message });
    }
};
