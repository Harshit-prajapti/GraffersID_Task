import express from 'express';
import Company from '../models/Company.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { search, city, sortBy } = req.query;
        let matchStage = {};

        if (search) {
            matchStage.$or = [
                { name: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { city: { $regex: search, $options: 'i' } }
            ];
        }

        if (city) {
            matchStage.city = city;
        }
        let sortStage = { createdAt: -1 };
        if (sortBy === 'Name') {
            sortStage = { name: 1 };
        } else if (sortBy === 'Date') {
            sortStage = { foundedOn: -1 };
        } else if (sortBy === 'Rating') {
            sortStage = { rating: -1 };
        }

        const companies = await Company.aggregate([
            { $match: matchStage },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'companyId',
                    as: 'reviewsData'
                }
            },
            {
                $addFields: {
                    reviews: { $size: '$reviewsData' },
                    rating: { $ifNull: [{ $avg: '$reviewsData.rating' }, 0] }
                }
            },
            {
                $project: {
                    reviewsData: 0
                }
            },
            { $sort: sortStage }
        ]);

        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching companies', error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching company', error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, location, foundedOn, city, logo, description } = req.body;

        const company = new Company({
            name,
            location,
            foundedOn,
            city,
            logo,
            description
        });

        const savedCompany = await company.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        res.status(400).json({ message: 'Error creating company', error: error.message });
    }
});

router.get('/filters/cities', async (req, res) => {
    try {
        const cities = await Company.distinct('city');
        res.json(cities.sort());
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cities', error: error.message });
    }
});

export default router;
