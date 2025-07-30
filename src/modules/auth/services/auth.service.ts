import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterDTO, LoginDTO } from '../../../types';
import { User } from '../../../models/user-model';
import APIError from '../../../helpers';
import { config } from '../../../config/config';

export default class AuthService {
    async registerUser(data: RegisterDTO) {
        const existingUser = await User.findOne({
            email: data.email,
        });
        if (existingUser) {
            throw new APIError({
                message: `User ${data.email} exists`,
                code: 400,
            });
        }
        const hashedpassword = await bcrypt.hash(data.password, 10);
        const newUser = await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedpassword,
        });

        return newUser;
    }

    async loginUser(data: LoginDTO) {
        const user = await User.findOne({
            email: data.email,
        });
        if (!user) {
            throw new APIError({
                message: 'User does not exist.',
                code: 404,
            });
        }
        const match = await bcrypt.compare(
            data.password,
            user.password,
        );
        if (!match) {
            throw new APIError({
                message: 'Invalid credentials.',
                code: 401,
            });
        }
        const token = jwt.sign(
            {
                id: user._id,
            },
            config.jwt.secret,
            { expiresIn: '1d' },
        );

        return {
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            token,
        };
    }
}
