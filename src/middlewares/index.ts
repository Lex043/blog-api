import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { logger } from '../config/logger';

interface AuthenticatedRequest extends Request {
    user?: any;
}

export default function AuthGuard(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) {
    let token;
    if (req.headers.client === 'not-browser') {
        token = req.headers.authorization;
    } else {
        token = req.cookies['Authorization'];
    }

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Token not provided' });
    }
    try {
        const userToken = token.split(' ')[1];
        const jwtVerified = jwt.verify(userToken, config.jwt.secret);
        if (jwtVerified) {
            req.user = jwtVerified;
            next();
        } else {
            throw new Error('error in the token');
        }
    } catch (error) {
        logger.error(error);
        return res
            .status(403)
            .json({ message: 'Invalid or expired token.' });
    }
}
