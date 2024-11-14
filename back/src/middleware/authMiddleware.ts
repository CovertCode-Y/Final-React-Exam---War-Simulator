// src/middleware/authMiddleware.ts
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
            res.status(401).json({ message: 'כותרת ההרשאה חייבת להתחיל ב-Bearer' });
            return;
        }

        const token = authHeader.substring(7);
        if (!token) {
            res.status(401).json({ message: 'לא סופק טוקן' });
            return;
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
        req.user = decodedToken;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'הטוקן פג תוקף' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'טוקן לא חוקי' });
        } else {
            res.status(500).json({ message: 'שגיאת שרת פנימית' });
        }
    }
};
