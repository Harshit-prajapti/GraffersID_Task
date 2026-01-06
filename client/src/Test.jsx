
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">★</span>
            </div>
            <span className="text-xl font-semibold">
              Review<span className="font-bold">&RATE</span>
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 font-medium">
              SignUp
            </button>
            <button className="text-gray-700 hover:text-gray-900 font-medium">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Star Rating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">
          {i < fullStars ? '★' : i === fullStars && hasHalfStar ? '⯨' : '☆'}
        </span>
      ))}
    </div>
  );
};

// Company Card Component
const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex space-x-4">
          {/* Logo */}
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
            style={{ backgroundColor: company.logoColor }}
          >
            {company.logoText}
          </div>

          {/* Company Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {company.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {company.address}
            </p>
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold">{company.rating}</span>
              <StarRating rating={company.rating} />
              <span className="text-sm text-gray-600">{company.reviews} Reviews</span>
            </div>
          </div>
        </div>

        {/* Right Side Info */}
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-3">{company.dateLabel}</p>
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
            Detail Review
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [city, setCity] = useState('Indore, Madhya Pradesh, India');
  const [sortBy, setSortBy] = useState('Name');

  const companies = [
    {
      id: 1,
      name: 'Graffersid Web and App Development',
      address: 'G 810, Shekhar Central, Manorama Ganj, AB road, New Palasia, Indore (M.P.)',
      rating: 4.5,
      reviews: 41,
      logoColor: '#1a1a2e',
      logoText: 'G',
      dateLabel: 'Founded on 01-01-2016'
    },
    {
      id: 2,
      name: 'Code Tech Company',
      address: 'G 414, Kanha Apportment Bhawarfalia, Indore (M.P.)',
      rating: 4.5,
      reviews: 0,
      logoColor: '#2d7d2d',
      logoText: '<CT>',
      dateLabel: 'Reg. Date: 01-01-2016'
    },
    {
      id: 3,
      name: 'Innogent Pvt. Ltd.',
      address: 'G 810, Shekhar Central, Manorama Ganj, AB road, New Palasia, Indore (M.P.)',
      rating: 4.5,
      reviews: 0,
      logoColor: '#ff8c00',
      logoText: '💡',
      dateLabel: 'Reg. Date: 01-01-2016'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Controls */}
        <div className="flex items-center space-x-4 mb-8">
          {/* City Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select City
            </label>
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <MapPin className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Find Button */}
          <div className="pt-7">
            <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-2 rounded-md font-medium transition-colors">
              Find Company
            </button>
          </div>

          {/* Add Company Button */}
          <div className="pt-7">
            <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-2 rounded-md font-medium transition-colors">
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
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option>Name</option>
              <option>Rating</option>
              <option>Date</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">Result Found: 1</p>
        </div>

        {/* Company Cards */}
        <div className="space-y-4">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;