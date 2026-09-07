import { verify } from '../helpers/token.js';
import User from '../models/User.js';

export default async function authenticated(req, res, next) {
  // Безопасная проверка кук с помощью опциональной цепочки ?.
  if (!req.cookies?.token) {
    return res.status(401).send({ error: 'Auth token is required' });
  }

  try {
    const tokenData = verify(req.cookies.token);

    const user = await User.findOne({ _id: tokenData.id });

    if (!user) {
      return res.status(401).send({ error: 'Authenticated user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Invalid or expired token' });
  }
}
