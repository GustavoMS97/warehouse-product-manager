const joi = require('joi');

exports.createProposalAndProposalProductRouteFactory = ({ createProposalAndProposalProduct } = {}) => {
  return {
    createProposalAndProposalProductRoute: async (req, res, next) => {
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
        } = joi.attempt(
          req.body,
          joi.object().keys({
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
          }),
        );
        const { success } = await createProposalAndProposalProduct({
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
        if (success) {
          return res.status(200).send({ response: 'Proposta realizada com sucesso' });
        }
      } catch (createProposalAndProposalProductError) {
        console.log(createProposalAndProposalProductError);
        throw new Error('Não foi possível criar uma proposta!');
      }
    },
  };
};
