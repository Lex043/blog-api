import mongoose from 'mongoose';
import { app } from './app';
import { config } from './config/config';
import { logger } from './config/logger';

const startServer = async () => {
    try {
        await mongoose.connect(config.mongo.url);
        app.listen(config.server.port, () => {
            logger.info(
                `Server ready at: http://localhost:${config.server.port}`,
            );
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
