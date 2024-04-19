import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

// Middleware to decode the token
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            throw new Error('Token not found');
        }

        const decoded: JwtPayload | string = jwt.verify(token, process.env.JWT_SECRET as string);
        if (typeof decoded === 'string') {
            throw new Error('Invalid token'); // Handle invalid token case
        }

        // Assign userId to req.body if decoded is JwtPayload
        if (decoded && typeof decoded !== 'string' && decoded.userId) {
            req.body.userId = decoded.userId;
        }

        next();
    } catch (error: any) { // Explicitly specify 'error' as type 'any' or 'Error'
        res.status(401).json({
            message: error.message || 'Unauthorized', // Access 'message' safely
            success: false,
        });
    }
};

export default authMiddleware;
