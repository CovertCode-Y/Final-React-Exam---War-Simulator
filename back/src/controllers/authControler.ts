import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import mongoose from 'mongoose';

const generateToken = (user: { _id: mongoose.Types.ObjectId; role: string; organization: string }): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign(
        {
            id: user._id.toString(),
            role: user.role,
            organization: user.organization,
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password, role, organization, region } = req.body;

        const userExists = await User.findOne({ username });
        if (userExists) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            password: hashedPassword,
            role,
            organization,
            region,
        });

        const token = generateToken({
            _id: user._id as mongoose.Types.ObjectId,
            role: user.role,
            organization: user.organization,
        });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                organization: user.organization,
                region: user.region,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = generateToken({
            _id: user._id as mongoose.Types.ObjectId,
            role: user.role,
            organization: user.organization,
        });

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                organization: user.organization,
                region: user.region,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
};

