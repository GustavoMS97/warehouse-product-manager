const jwt = require('jsonwebtoken');

exports.requestAuthenticationMiddlewareFactory = () => {
  return {
    requestAuthenticationMiddleware: (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send({ error: 'No token provided.' });
      }
      const parts = authHeader.split(' ');
      if (!parts.length === 2) {
        return res.status(401).send({ error: 'Token error' });
      }
      const [scheme, token] = parts;
      if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' });
      }
      const token_data = jwt.decode(token);
      req.token_data = token_data;
      return next();
    },
  };
};
