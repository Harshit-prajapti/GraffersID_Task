
import express from 'express';
import {
    getCompanies,
    getCompanyById,
    createCompany,
    getCompanyCities
} from '../controllers/companyController.js';

const router = express.Router();

router.get('/', getCompanies);
router.get('/filters/cities', getCompanyCities);
router.get('/:id', getCompanyById);
router.post('/', createCompany);

export default router;
