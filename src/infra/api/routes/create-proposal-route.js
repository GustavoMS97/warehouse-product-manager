const joi = require('joi');

exports.createProposalRouteFactory = ({ createProposal } = {}) => {
  return {
    createProposalRoute: async (req, res, next) => {
      try {
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            name: joi.string().required(),
            code: joi.string().required(),
            quantity: joi.string().required(),
            price: joi.string().required(),
            unitOfMeasurement: joi.string().required(),
            category: joi.string().required(),
            provider: joi.string().required(),
            minimumInStock: joi.string().required(),
            paymentDate: joi.string().required(),
            deliveryDate: joi.string().required(),
            accepted: joi.string().required(),
            quote: joi.string().required(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const {
          name,
          code,
          quantity,
          price,
          unitOfMeasurement,
          category,
          provider,
          minimumInStock,
          paymentDate,
          deliveryDate,
          accepted,
          quote,
        } = reqBodyValues;
        const { newProposal } = await createProposal({
          name,
          code,
          quantity,
          price,
          unitOfMeasurement,
          category,
          provider,
          minimumInStock,
          paymentDate,
          deliveryDate,
          accepted,
          quote,
        });
        return res.status(201).send({ newProposal });
      } catch (createProposalRouteError) {
        console.log(createProposalRouteError);
        next(createProposalRouteError);
      }
    },
  };
};
