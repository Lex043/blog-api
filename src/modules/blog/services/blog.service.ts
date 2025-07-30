import { Blog } from '../../../models/blog-model';
import APIError from '../../../helpers';
import { PostDTO } from '../../../types';

export default class BlogService {
    async getPost(id: string) {
        const post = await Blog.findById(id);
        if (!post) {
            throw new APIError({
                message: `Post does not exists`,
                code: 400,
            });
        }
        return post;
    }

    async createPost(data: PostDTO) {
        const { title, content, coverImageUrl, userId } = data;
        if (!userId) {
            throw new APIError({
                message: 'User ID not found in token',
                code: 401,
            });
        }
        const post = await Blog.create({
            title,
            content,
            coverImageUrl,
            userId,
        });

        return post;
    }

    async updatePost(id: string, data: PostDTO) {
        const post = await Blog.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        if (!post) {
            throw new APIError({
                message: 'Post not found',
                code: 404,
            });
        }
        return post;
    }

    async deletePost(id: string) {
        const post = await Blog.findByIdAndDelete(id);
        if (!post) {
            throw new APIError({
                message: 'Post not found',
                code: 404,
            });
        }
        return post;
    }
}
