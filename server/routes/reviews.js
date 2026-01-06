import express from 'express';
import mongoose from 'mongoose';
import Review from '../models/Review.js';
import Company from '../models/Company.js';

const router = express.Router();

router.get('/:companyId', async (req, res) => {
    try {
        const { companyId } = req.params;
        const { sortBy } = req.query;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        let sort = { createdAt: -1 }; 
        if (sortBy === 'rating') {
            sort = { rating: -1, createdAt: -1 }; 
        } else if (sortBy === 'relevance') {
            sort = { likes: -1, createdAt: -1 }; 
        }

        const reviews = await Review.find({ companyId }).sort(sort);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

router.get('/:companyId/average', async (req, res) => {
    try {
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
            averageRating: Math.round(result[0].averageRating * 10) / 10, // Round to 1 decimal
            totalReviews: result[0].totalReviews
        });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating average rating', error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { companyId, fullName, subject, reviewText, rating } = req.body;

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
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: 'Error creating review', error: error.message });
    }
});

router.put('/:id/like', async (req, res) => {
    try {
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
        res.status(500).json({ message: 'Error liking review', error: error.message });
    }
});

export default router;
