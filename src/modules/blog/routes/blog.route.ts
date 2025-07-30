import express from 'express';
import { BlogController } from '../controller/blog.controller';
import AuthGuard from '../../../middlewares';
import { postValidator } from '../validators';
const router = express();

router.get('/', BlogController.getPosts);
router.get('/:id', BlogController.getPost);
router.post(
    '/',
    AuthGuard,
    postValidator.post,
    BlogController.createPost,
);
router.patch('/:id', AuthGuard, BlogController.updatePost);
router.delete('/:id', AuthGuard, BlogController.deletePost);

export const BlogRoutes = router;
