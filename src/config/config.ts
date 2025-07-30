import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT
    ? Number(process.env.SERVER_PORT)
    : 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? '';

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.MONGO_APP}`;

export const config = {
    server: {
        port: SERVER_PORT,
    },
    mongo: {
        url: MONGO_URI,
    },
    jwt: {
        secret: JWT_SECRET,
    },
};
