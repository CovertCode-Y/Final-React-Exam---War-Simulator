import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    userId: string;
    role: string;
    organization: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Authorization header must start with Bearer' });
            return;
        }

        const token = authHeader.substring(7);
        if (!token) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
        req.user = decodedToken;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
