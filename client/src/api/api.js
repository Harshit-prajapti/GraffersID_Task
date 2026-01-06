import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Company API calls
export const fetchCompanies = async (params = {}) => {
    const { data } = await api.get('/companies', { params });
    return data;
};

export const fetchCompanyById = async (id) => {
    const { data } = await api.get(`/companies/${id}`);
    return data;
};

export const createCompany = async (companyData) => {
    const { data } = await api.post('/companies', companyData);
    return data;
};

export const fetchCities = async () => {
    const { data } = await api.get('/companies/filters/cities');
    return data;
};

// Review API calls
export const fetchReviews = async (companyId, sortBy = 'date') => {
    const { data } = await api.get(`/reviews/${companyId}`, {
        params: { sortBy },
    });
    return data;
};

export const createReview = async (reviewData) => {
    const { data } = await api.post('/reviews', reviewData);
    return data;
};

export const getAverageRating = async (companyId) => {
    const { data } = await api.get(`/reviews/${companyId}/average`);
    return data;
};

export const likeReview = async (reviewId) => {
    const { data } = await api.put(`/reviews/${reviewId}/like`);
    return data;
};

export default api;
