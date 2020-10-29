const joi = require('joi');

exports.createQuotesRouteFactory = ({ createQuotes } = {}) => {
  return {
    createQuotesRoute: async (req, res, next) => {
      try {
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            name: joi.string().required(),
            description: joi.string().required(),
            warehouse: joi.string().required(),
            user: joi.string().required(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const { description, warehouse } = reqBodyValues;
        const { id } = req.token_data;
        const { quotes } = await createQuotes({ description, warehouse, user: id });
        return res.status(201).send({ quotes });
      } catch (createQuotesRouteError) {
        console.log(createQuotesRouteError);
        next(createQuotesRouteError);
      }
    },
  };
};
