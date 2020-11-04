const joi = require('joi');

exports.createPaymentInfoRouteFactory = ({ createPaymentInfo } = {}) => {
  return {
    createPaymentInfoRoute: async (req, res, next) => {
      try {
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            owner: joi.string().required(),
            cardHash: joi.string().required(),
            bankslipNumber: joi.string(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const { owner, cardHash, bankslipNumber } = reqBodyValues;
        const { paymentInfo } = await createPaymentInfo({
          owner,
          cardHash,
          bankslipNumber,
        });
        return res.status(201).send({ paymentInfo });
      } catch (createBranchRouteError) {
        console.log(createBranchRouteError);
        next(createBranchRouteError);
      }
    },
  };
};
