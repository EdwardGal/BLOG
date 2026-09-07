import 'dotenv/config';
import jwt from 'jsonwebtoken';

const sign = process.env.JWT_SECRET;

export const generate = (data) => jwt.sign(data, sign, { expiresIn: '30d' });

export const verify = (token) => jwt.verify(token, sign);
