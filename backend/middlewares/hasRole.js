export default function (roles) {
  return (req, res, next) => {
    // Безопасная проверка: если req.user не существует, приложение не упадет
    if (!roles.includes(req.user?.role)) {
      res.send({ error: 'Access denied' });
      return;
    }

    next();
  };
}
