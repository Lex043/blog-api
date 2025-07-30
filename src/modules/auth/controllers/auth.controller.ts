import { Response, Request } from 'express';
import AuthService from '../services/auth.service';
import { logger } from '../../../config/logger';

const authService = new AuthService();

export class AuthController {
    static async signup(req: Request, res: Response) {
        try {
            const { firstName, lastName, email, password } = req.body;
            const user = await authService.registerUser({
                firstName,
                lastName,
                email,
                password,
            });
            return res.status(201).json({
                message: 'User created successfully',
                data: {
                    id: user._id,
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                },
            });
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ error: error });
        }
    }
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await authService.loginUser({
                email,
                password,
            });
            res.cookie('Authorization', 'Bearer ' + user.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 86400000,
                sameSite: 'none',
            });
            return res.status(200).json({
                message: 'User logged in successfully',
                data: user,
            });
        } catch (error) {
            logger.error(error);
        }
    }
    static async logout(_: Request, res: Response) {
        res.clearCookie('Authorization', {
            expires: new Date(0),
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
        });
        res.json({ message: 'Logged out successfully.' });
    }
}
