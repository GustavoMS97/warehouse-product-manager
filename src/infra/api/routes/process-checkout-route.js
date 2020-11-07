const joi = require('joi');
const randomstring = require('randomstring');
const ObjectId = require('mongoose').Types.ObjectId;

exports.processCheckoutRouteFactory = ({ processCheckout, createPaymentInfo } = {}) => {
  return {
    processCheckoutRoute: async (req, res, next) => {
      try {
        const { id } = req.token_data;
        if (!ObjectId.isValid(id)) {
          throw new Error('Usuário inválido!');
        }
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            cardHash: joi.string(),
            isBankslip: joi.boolean(),
            shoppingCartId: joi.string().required(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const { cardHash, isBankslip, shoppingCartId } = reqBodyValues;
        let paymentInfoResponse;
        if (isBankslip) {
          const bankslipNumber = randomstring.generate({ charset: 'alphanumeric' });
          const { paymentInfo } = await createPaymentInfo({ owner: id, bankslipNumber });
          paymentInfoResponse = paymentInfo;
        } else {
          const { paymentInfo } = await createPaymentInfo({ owner: id, cardHash });
          paymentInfoResponse = paymentInfo;
        }
        const { checkout } = await processCheckout({
          shoppingCartId,
          paymentInfoId: paymentInfoResponse._id,
          owner: id,
        });
        if (checkout) {
          return res.status(201).send(checkout);
        } else {
          return res.status(400).send();
        }
      } catch (processCheckoutRouteError) {
        console.log(processCheckoutRouteError);
        next(processCheckoutRouteError);
      }
    },
  };
};
