import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-[var(--whatsapp-teal)] px-4 py-3 shadow-md fixed top-0 w-full z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-white text-xl font-bold tracking-wide">
                        Company Reviews
                    </h1>
                </div>
                <button
                    onClick={() => navigate('/add-company')}
                    className="bg-white text-[var(--whatsapp-teal)] font-semibold py-1.5 px-4 rounded-full hover:bg-gray-100 transition-colors shadow-sm text-sm"
                >
                    + Add Company
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
