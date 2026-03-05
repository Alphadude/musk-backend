import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';
import { errorResponse } from '../lib/responseHandler';

export interface AuthRequest extends Request {
    user?: {
        userId: number;
        email: string;
    };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Exclude GET requests from authentication
    if (req.method === 'GET') {
        return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json(errorResponse('Authorization header missing or invalid', null));
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json(errorResponse('Invalid or expired token', null));
    }

    req.user = decoded;
    next();
};
