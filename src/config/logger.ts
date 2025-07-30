import pino from 'pino';

export const logger = pino({
    transport: {
        target: 'pino-pretty',
    },
    level: 'debug',
    base: null,
    timestamp: false,
});
