# Company Reviews - MERN Stack Application

A full-stack web application for managing company profiles and reviews built with the MERN stack (MongoDB, Express.js, React, Node.js) and Tailwind CSS.

## Features

### Company Management
- ✅ Add new company profiles with details (name, location, founded date, city, logo, description)
- ✅ View all companies in a responsive grid layout
- ✅ Search companies by name, location, or city
- ✅ Filter companies by city
- ✅ Click on company cards to view detailed information

### Review System
- ✅ Add reviews for companies with star ratings (1-5)
- ✅ View all reviews for a specific company
- ✅ Sort reviews by date, rating, or relevance (most liked)
- ✅ Like reviews to show appreciation
- ✅ Display average rating prominently
- ✅ Show total review count

### UI/UX
- ✅ Modern, clean design with Tailwind CSS
- ✅ Responsive layout for all screen sizes
- ✅ Smooth animations and transitions
- ✅ Loading states for async operations
- ✅ Form validation
- ✅ Empty state handling

## Tech Stack

**Frontend:**
- React 18
- React Router DOM (routing)
- Axios (HTTP client)
- Tailwind CSS (styling)
- Vite (build tool)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
cd d:/Task
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/company-reviews
```

**Note:** If using MongoDB Atlas, replace the URI with your connection string.

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### 4. Start MongoDB
Make sure MongoDB is running locally or you have a valid MongoDB Atlas connection.

**For local MongoDB:**
```bash
mongod
```

### 5. Run the Application

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

## Usage

1. **Add a Company:**
   - Click "Add Company" button on the home page
   - Fill in all required fields (name, location, founded date, city)
   - Optionally add logo URL and description
   - Submit the form

2. **Search and Filter:**
   - Use the search bar to find companies by name, location, or city
   - Use the city dropdown to filter by specific city

3. **View Company Details:**
   - Click on any company card to view full details
   - See average rating and total review count
   - Browse all reviews with sorting options

4. **Add a Review:**
   - On company detail page, click "Add Review"
   - Enter your name, subject, and review text
   - Select a star rating (1-5)
   - Submit the review

5. **Interact with Reviews:**
   - Click the thumbs up icon to like a review
   - Use sort dropdown to arrange by date, rating, or relevance

## API Endpoints

### Companies
- `GET /api/companies` - Get all companies (supports search and filter)
- `GET /api/companies/:id` - Get single company
- `POST /api/companies` - Create new company
- `GET /api/companies/filters/cities` - Get all unique cities

### Reviews
- `GET /api/reviews/:companyId` - Get all reviews for a company
- `POST /api/reviews` - Create new review
- `GET /api/reviews/:companyId/average` - Get average rating
- `PUT /api/reviews/:id/like` - Increment like count

## Project Structure

```
Task/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API service functions
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Tailwind CSS
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
│
└── server/                # Backend Node.js application
    ├── models/            # Mongoose models
    ├── routes/            # Express routes
    ├── server.js          # Entry point
    ├── package.json
    └── .env               # Environment variables
```

## Features Implemented

✅ All required functionality from the task specification
✅ Clean, modern UI design
✅ Responsive layout
✅ Search and filter capabilities
✅ Review sorting (date, rating, relevance)
✅ Average rating calculation
✅ Like functionality for reviews
✅ Form validation
✅ Error handling
✅ Loading states

## Development Notes

- The application uses ES6 modules throughout
- MongoDB indexes are created for efficient searching and sorting
- CORS is enabled for cross-origin requests
- All API calls include proper error handling
- Form inputs have validation on both client and server side

## Future Enhancements

- User authentication and authorization
- Image upload for company logos
- Review editing and deletion
- Pagination for large datasets
- Advanced filtering options
- Review moderation
- Email notifications

## License

MIT

## Author

Created as part of a MERN stack development task.
