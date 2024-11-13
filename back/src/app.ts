import express from 'express';
import {connectDB} from './database/database';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute';

dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());

app.use(cors());

connectDB();

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});