import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AuthRoutes } from './modules/auth/routes/auth.route';
import { BlogRoutes } from './modules/blog/routes/blog.route';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
    }),
);
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/posts', BlogRoutes);

// Basic health check route
app.get('/health', (_req, res) => {
    return res.status(200).json({ message: 'ok ' });
});

export { app };
