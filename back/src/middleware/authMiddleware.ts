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

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers('Authorization');
    
}