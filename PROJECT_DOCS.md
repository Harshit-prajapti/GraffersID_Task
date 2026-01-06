# REVIEW & RATE - MERN Project Documentation

## 1. Project Overview
**Review & Rate** is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to list companies and browse/write reviews. It features a modern, responsive UI ("Review&RATE" purple theme) and implements core backend functionalities like text search, filtering, and aggregation pipelines for analytics.

## 2. Technology Stack

### Frontend
- **React (Vite)**: Fast client-side rendering.
- **Tailwind CSS**: Utility-first styling for a custom, professional design.
- **React Router DOM**: Client-side routing.
- **Axios**: HTTP client for API requests.
- **Lucide React**: Modern iconography.

### Backend
- **Node.js & Express**: robust server-side runtime and framework.
- **MongoDB & Mongoose**: NoSQL database with schema modeling.
- **Cors**: Cross-Origin Resource Sharing middleware.

## 3. Key Features & Implementation Details

### A. Company Reviews & Ratings (Aggregation Pipeline)
**Question:** How is the average rating and review count calculated?
**Implementation:**
The backend uses a **MongoDB Aggregation Pipeline** in the `GET /companies` route instead of simple `.find()`.
1.  **$match**: Filters companies based on search terms or city.
2.  **$lookup**: Joins the `companies` collection with the `reviews` collection (like SQL JOIN).
3.  **$addFields**:
    - Calculates `reviews` count using `$size`.
    - Calculates `rating` average using `$avg`.
4.  **$sort**: Sorts the final results based on the dynamic fields (e.g., highest rated).

### B. Search & Filtering
**Implementation:**
- **Text Search**: Uses Regex (`$regex`) with `'i'` flag for case-insensitive matching across `name`, `location`, and `city`.
- **Filtering**: Precise matching for fields like `city`.

### C. State Management
- **Frontend**: Uses React `useState` and `useEffect` for managing data fetching, loading states, and form inputs.
- **Context/Props**: Data flow is primarily parent-to-child (props), keeping the architecture simple and predictable.

## 4. Interview Preparation (Q&A)

### Q1: Why did you use MongoDB Aggregation instead of calculating averages in Javascript?
**Answer:**
Performance and Scalability.
- **Efficiency**: The database engine (MongoDB) is optimized for data processing. Calculating averages for thousands of reviews in Node.js would require fetching all review documents over the network, consuming massive memory and bandwidth.
- **Sorting**: We can sort by "Rating" directly in the database query. If we calculated it in JS, we'd have to fetch *all* pages of data to sort them correctly, breaking pagination.

### Q2: How did you handle the UI "Review&RATE" theme customisation?
**Answer:**
I moved away from pre-built component libraries and used **Tailwind CSS**. I defined a custom color palette (purples/grays) and implemented reusable components like `CompanyCard`, `StarRating`, and `TopBar` to ensure visual consistency. This allowed pixel-perfect implementation of the desired design.

### Q3: How would you improve this application for production?
**Answer:**
1.  **Authentication**: Implement JWT (JSON Web Tokens) to verify users before posting reviews.
2.  **Pagination**: Implement cursor-based pagination for the `GET /companies` route to handle large datasets.
3.  **Caching**: Use Redis to cache the aggregation results for companies, as average ratings don't change every millisecond.
4.  **Validation**: Add strict backend validation using libraries like `Joi` or `Zod`.

### Q4: Explain the Folder Structure.
**Answer:**
- **client/**: React frontend.
    - `src/api`: Centralized Axios instance.
    - `src/components`: Reusable UI blocks (`CompanyCard`, `Navbar`).
    - `src/pages`: Route views (`CompanyList`, `AddReview`).
- **server/**: Express backend.
    - `models/`: Mongoose schemas.
    - `routes/`: API endpoints (`companies.js`, `reviews.js`).

### Q5: What was the most challenging part?
**Answer:**
(Sample Answer): "Implementing the aggregation pipeline for the calculated fields (`rating` count and average). Ensuring that `lookup` joined the correct data and properly handling cases where a company had zero reviews (using `$ifNull`) was a great learning experience in database logic."
