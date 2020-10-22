const joi = require('joi');

exports.createCampaingRouteFactory = ({ createCampaing } = {}) => {
  return {
    createCampaingRoute: async (req, res, next) => {
      try {
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            name: joi.string().required(),
            products: joi.array().required(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const { name, products } = reqBodyValues;
        const { campaing } = await createCampaing({ name, products });
        return res.status(201).send({ campaing });
      } catch (createCampaingRouteError) {
        console.log(createCampaingRouteError);
        next(createCampaingRouteError);
      }
    },
  };
};
