import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import companyRoutes from './routes/companies.js';
import reviewRoutes from './routes/reviews.js';
import connectDB from './lib/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

app.use('/api/companies', companyRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong..', error: err.message });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`API endpoints:`);
        console.log(`   - GET    /api/companies`);
        console.log(`   - POST   /api/companies`);
        console.log(`   - GET    /api/companies/:id`);
        console.log(`   - GET    /api/reviews/:companyId`);
        console.log(`   - POST   /api/reviews`);
        console.log(`   - GET    /api/reviews/:companyId/average`);
        console.log(`   - PUT    /api/reviews/:id/like`);
    });
});


// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await mongoose.connection.close();
    process.exit(0);
});
