# API Testing Guide

This guide provides sample API requests for testing the Company Reviews backend.

## Prerequisites

- Backend server running on `http://localhost:5000`
- MongoDB running and connected
- Tool: Thunder Client, Postman, or curl

---

## Company Endpoints

### 1. Create a Company

**POST** `http://localhost:5000/api/companies`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "TechCorp Solutions",
  "location": "San Francisco, CA",
  "foundedOn": "2015-03-15",
  "city": "San Francisco",
  "logo": "https://via.placeholder.com/150?text=TechCorp",
  "description": "Leading technology solutions provider specializing in cloud infrastructure and AI."
}
```

**Expected Response:** `201 Created`
```json
{
  "_id": "65abc123...",
  "name": "TechCorp Solutions",
  "location": "San Francisco, CA",
  "foundedOn": "2015-03-15T00:00:00.000Z",
  "city": "San Francisco",
  "logo": "https://via.placeholder.com/150?text=TechCorp",
  "description": "Leading technology solutions provider...",
  "createdAt": "2026-01-05T...",
  "updatedAt": "2026-01-05T..."
}
```

---

### 2. Get All Companies

**GET** `http://localhost:5000/api/companies`

**Expected Response:** `200 OK`
```json
[
  {
    "_id": "65abc123...",
    "name": "TechCorp Solutions",
    "location": "San Francisco, CA",
    ...
  }
]
```

---

### 3. Search Companies

**GET** `http://localhost:5000/api/companies?search=Tech`

**Expected Response:** `200 OK` - Returns companies matching "Tech" in name, location, or city

---

### 4. Filter by City

**GET** `http://localhost:5000/api/companies?city=San Francisco`

**Expected Response:** `200 OK` - Returns companies in San Francisco

---

### 5. Combined Search and Filter

**GET** `http://localhost:5000/api/companies?search=Tech&city=San Francisco`

**Expected Response:** `200 OK` - Returns companies matching both criteria

---

### 6. Get Single Company

**GET** `http://localhost:5000/api/companies/:id`

Replace `:id` with actual company ID from previous responses.

**Expected Response:** `200 OK`

---

### 7. Get All Cities

**GET** `http://localhost:5000/api/companies/filters/cities`

**Expected Response:** `200 OK`
```json
["San Francisco", "New York", "Austin", ...]
```

---

## Review Endpoints

### 1. Create a Review

**POST** `http://localhost:5000/api/reviews`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "companyId": "65abc123...",
  "fullName": "John Doe",
  "subject": "Excellent Service",
  "reviewText": "I had a great experience working with this company. Their team is professional and responsive.",
  "rating": 5
}
```

**Expected Response:** `201 Created`
```json
{
  "_id": "65def456...",
  "companyId": "65abc123...",
  "fullName": "John Doe",
  "subject": "Excellent Service",
  "reviewText": "I had a great experience...",
  "rating": 5,
  "likes": 0,
  "createdAt": "2026-01-05T...",
  "updatedAt": "2026-01-05T..."
}
```

---

### 2. Get All Reviews for a Company

**GET** `http://localhost:5000/api/reviews/:companyId`

Replace `:companyId` with actual company ID.

**Expected Response:** `200 OK`
```json
[
  {
    "_id": "65def456...",
    "companyId": "65abc123...",
    "fullName": "John Doe",
    "subject": "Excellent Service",
    "reviewText": "I had a great experience...",
    "rating": 5,
    "likes": 0,
    "createdAt": "2026-01-05T...",
    "updatedAt": "2026-01-05T..."
  }
]
```

---

### 3. Sort Reviews by Rating

**GET** `http://localhost:5000/api/reviews/:companyId?sortBy=rating`

**Expected Response:** `200 OK` - Reviews sorted by highest rating first

---

### 4. Sort Reviews by Date

**GET** `http://localhost:5000/api/reviews/:companyId?sortBy=date`

**Expected Response:** `200 OK` - Reviews sorted by newest first (default)

---

### 5. Sort Reviews by Relevance (Most Liked)

**GET** `http://localhost:5000/api/reviews/:companyId?sortBy=relevance`

**Expected Response:** `200 OK` - Reviews sorted by most likes first

---

### 6. Get Average Rating

**GET** `http://localhost:5000/api/reviews/:companyId/average`

**Expected Response:** `200 OK`
```json
{
  "averageRating": 4.5,
  "totalReviews": 12
}
```

If no reviews exist:
```json
{
  "averageRating": 0,
  "totalReviews": 0
}
```

---

### 7. Like a Review

**PUT** `http://localhost:5000/api/reviews/:id/like`

Replace `:id` with actual review ID.

**Expected Response:** `200 OK`
```json
{
  "_id": "65def456...",
  "companyId": "65abc123...",
  "fullName": "John Doe",
  "subject": "Excellent Service",
  "reviewText": "I had a great experience...",
  "rating": 5,
  "likes": 1,
  "createdAt": "2026-01-05T...",
  "updatedAt": "2026-01-05T..."
}
```

---

## Sample Test Workflow

1. **Create 2-3 companies** using POST `/api/companies`
2. **List all companies** using GET `/api/companies`
3. **Test search** with GET `/api/companies?search=Tech`
4. **Get a specific company** using GET `/api/companies/:id`
5. **Add 3-5 reviews** for one company using POST `/api/reviews`
6. **Get all reviews** using GET `/api/reviews/:companyId`
7. **Check average rating** using GET `/api/reviews/:companyId/average`
8. **Like some reviews** using PUT `/api/reviews/:id/like`
9. **Test sorting** with different `sortBy` parameters

---

## Error Responses

### 400 Bad Request
Missing required fields or validation errors
```json
{
  "message": "Error creating company",
  "error": "Company validation failed: name: Path `name` is required."
}
```

### 404 Not Found
Resource not found
```json
{
  "message": "Company not found"
}
```

### 500 Internal Server Error
Server-side errors
```json
{
  "message": "Error fetching companies",
  "error": "..."
}
```

---

## Health Check

**GET** `http://localhost:5000/api/health`

**Expected Response:** `200 OK`
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Notes

- All timestamps are in ISO 8601 format
- Company IDs and Review IDs are MongoDB ObjectIds
- Rating must be between 1 and 5
- All text fields are trimmed automatically
- Search is case-insensitive
