import React from 'react';
import { Search } from 'lucide-react';

const TopBar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl font-bold">★</span>
                        </div>
                        <span className="text-xl font-semibold">
                            Review<span className="font-bold">&RATE</span>
                        </span>
                    </div>

                    <div className="flex-1 max-w-md mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-6 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

export default TopBar