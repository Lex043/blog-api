import BlogService from './blog.service';

describe('getPosts', () => {
    it('should return an array of posts', async () => {
        const blogService = new BlogService();
        await blogService.getPosts;
    });
});
