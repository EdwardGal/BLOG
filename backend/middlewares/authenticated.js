const { verify } = require('../helpers/token');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  // 1. Проверяем, есть ли кука вообще. Если нет — отдаем 401 ошибку вместо падения
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).send({ error: 'Auth token is required' });
  }

  try {
    // 2. Проверяем токен в try-catch
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
};
