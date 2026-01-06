
import Company from '../models/Company.js';

export const getCompanies = async (req, res) => {
    try {
        console.log("Fetching companies with query : ", req.query);
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

        console.log(`Found ${companies.length} companies`);
        res.json(companies);
    } catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ message: 'Error fetching companies', error: error.message });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            console.log("Company not found");
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        console.error("Error fetching company:", error);
        res.status(500).json({ message: 'Error fetching company', error: error.message });
    }
};

export const createCompany = async (req, res) => {
    try {
        console.log("Creating new company : ", req.body);
        const { name, location, foundedOn, city, logo, description } = req.body;

        if (!name || !location || !foundedOn || !city) {
            return res.status(400).json({ message: 'Name, location, founded date, and city are required' });
        }

        const company = new Company({
            name,
            location,
            foundedOn,
            city,
            logo,
            description
        });

        const savedCompany = await company.save();
        console.log("Company created successfully : ", savedCompany._id);
        res.status(201).json(savedCompany);
    } catch (error) {
        console.error("Error creating company:", error);
        res.status(400).json({ message: 'Error creating company', error: error.message });
    }
};

export const getCompanyCities = async (req, res) => {
    try {
        console.log("Fetching distinct cities");
        const cities = await Company.distinct('city');
        res.json(cities.sort());
    } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ message: 'Error fetching cities', error: error.message });
    }
};
