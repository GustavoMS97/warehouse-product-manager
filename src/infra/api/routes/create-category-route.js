const joi = require('joi');

exports.createCategoryRouteFactory = ({ createCategory } = {}) => {
  return {
    createCategoryRoute: async (req, res, next) => {
      try {
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            name: joi.string().required(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const { name } = reqBodyValues;
        const { category } = await createCategory({ name });
        return res.status(201).send({ category });
      } catch (createCategoryRouteError) {
        console.log(createCategoryRouteError);
        next(createCategoryRouteError);
      }
    },
  };
};
