// src/database/database.ts
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}; 