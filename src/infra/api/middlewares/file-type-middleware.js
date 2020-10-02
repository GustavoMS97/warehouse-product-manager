exports.fileTypeMiddlewareFactory = ({ expectedType } = {}) => {
  return {
    fileTypeMiddleware: (req, res, next) => {
      try {
        if (!req.file) {
          return res.status(400).send({ error: 'Arquivo obrigatorio!' });
        }
        if (req.file.mimetype !== expectedType) {
          return res.status(400).send({ error: `Tipo recebido diferente do esperado: ${expectedType}` });
        }
        return next();
      } catch (fileTypeMiddlewareError) {
        console.log(fileTypeMiddlewareError);
        next(fileTypeMiddlewareError);
      }
    },
  };
};
