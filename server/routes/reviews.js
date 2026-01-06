
import express from 'express';
import {
    getReviewsByCompanyId,
    getReviewStats,
    createReview,
    likeReview
} from '../controllers/reviewController.js';

const router = express.Router();

router.get('/:companyId', getReviewsByCompanyId);
router.get('/:companyId/average', getReviewStats);
router.post('/', createReview);
router.put('/:id/like', likeReview);

export default router;
