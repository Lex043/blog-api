import express from 'express';
import { authValidator } from '../validators';
import { AuthController } from '../controllers/auth.controller';
import AuthGuard from '../../../middlewares';

const router = express();

router.post('/signup', authValidator.register, AuthController.signup);
router.post('/login', authValidator.login, AuthController.login);
router.post(
    '/logout',
    AuthGuard,
    authValidator.login,
    AuthController.logout,
);

export const AuthRoutes = router;
