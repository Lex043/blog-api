import { Response, Request } from 'express';
import { logger } from '../../../config/logger';
import BlogService from '../services/blog.service';

interface AuthenticatedRequest extends Request {
    user?: any;
}

const blogService = new BlogService();

export class BlogController {
    static async getPosts(_req: Request, res: Response) {
        try {
            const post = await blogService.getPosts();
            return res.status(200).json({
                message: 'Posts fetched successfully',
                data: post,
            });
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ error: error });
        }
    }

    static async getPost(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const post = await blogService.getPostById(id);
            return res.status(200).json({
                message: 'Post fetched successfully',
                data: post,
            });
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ error: error });
        }
    }

    static async createPost(
        req: AuthenticatedRequest,
        res: Response,
    ) {
        try {
            const { title, content, coverImageUrl } = req.body;
            const userId = req.user.id;
            const post = await blogService.createPost({
                title,
                content,
                coverImageUrl,
                userId,
            });

            return res.status(201).json({
                message: 'Post created successfully',
                data: post,
            });
        } catch (error) {
            logger.error(error);
            return res
                .status(500)
                .json({ error: 'Something went wrong' });
        }
    }

    static async updatePost(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const post = await blogService.updatePost(id, req.body);
            return res.status(200).json({
                message: 'Post updated successfully',
                data: post,
            });
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ error: error });
        }
    }

    static async deletePost(req: Request, res: Response) {
        try {
            const post = await blogService.deletePost(req.params.id);
            return res.status(201).json({
                message: 'Post deleted successfully',
                data: post,
            });
        } catch (error) {
            logger.error(error);
            return res.status(500).json({ error: error });
        }
    }
}
