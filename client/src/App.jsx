import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyList from './pages/CompanyList';
import AddCompany from './pages/AddCompany';
import CompanyDetail from './pages/CompanyDetail';
import AddReview from './pages/AddReview';

import TopBar from './components/TopBar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <TopBar />
        <div className="pt-8">
          <Routes>
            <Route path="/" element={<CompanyList />} />
            <Route path="/add-company" element={<AddCompany />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/company/:id/add-review" element={<AddReview />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
