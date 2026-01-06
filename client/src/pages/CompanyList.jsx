import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { fetchCompanies, fetchCities } from '../api/api';
import CompanyCard from '../components/CompanyCard';
import LoadingSpinner from '../components/LoadingSpinner';

const CompanyList = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('Indore, Madhya Pradesh, India');
    const [cities, setCities] = useState([]);
    const [sortBy, setSortBy] = useState('Name');

    useEffect(() => {
        loadCities();
    }, []);

    useEffect(() => {
        loadCompanies();
    }, [searchTerm, selectedCity, sortBy]);

    const loadCities = async () => {
        try {
            const data = await fetchCities();
            setCities(data);
        } catch (error) {
            console.error('Error loading cities:', error);
        }
    };

    const loadCompanies = async () => {
        setLoading(true);
        try {
            const params = {};
            if (searchTerm) params.search = searchTerm;
            if (selectedCity && selectedCity !== 'Indore, Madhya Pradesh, India') params.city = selectedCity;
            params.sortBy = sortBy;

            const data = await fetchCompanies(params);
            console.log(data);
            setCompanies(data);
        } catch (error) {
            console.error('Error loading companies:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-8 space-y-4 md:space-y-0">
                {/* City Selector */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select City
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter city..."
                        />
                        <MapPin className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                        {/* 
                           Note: If we want a dropdown like before, we could use a datalist or custom dropdown. 
                           The user's design mockup showed a text input. keeping as input for now but maybe suggested list 
                        */}
                    </div>
                </div>

                {/* Find Button */}
                <div className="pt-0 md:pt-7">
                    <button
                        onClick={loadCompanies}
                        className="btn-primary cursor-pointer"
                    >
                        Find Company
                    </button>
                </div>

                {/* Add Company Button */}
                <div className="pt-0 md:pt-7">
                    <button
                        onClick={() => navigate('/add-company')}
                        className="btn-primary cursor-pointer"
                    >
                        + Add Company
                    </button>
                </div>

                {/* Sort Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort:
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                        <option value="Name">Name</option>
                        <option value="Rating">Rating</option>
                        <option value="Date">Date</option>
                    </select>
                </div>
            </div>

            {/* Results */}
            <div className="mb-4">
                <p className="text-sm text-gray-600">Result Found: {companies.length}</p>
            </div>

            {/* Company Cards */}
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="space-y-4">
                    {companies.map((company) => (
                        <CompanyCard key={company._id} company={company} />
                    ))}
                    {companies.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No companies found. Try adjusting your search or add a new one.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CompanyList;