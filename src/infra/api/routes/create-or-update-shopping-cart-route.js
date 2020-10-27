const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createOrUpdateShoppingCartRouteFactory = ({ createOrUpdateShoppingCart } = {}) => {
  return {
    createOrUpdateShoppingCartRoute: async (req, res, next) => {
      try {
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            product: joi.string().required(),
            quantity: joi.number().required().integer().positive(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const { product, quantity } = reqBodyValues;
        const { id } = req.token_data;
        if (!ObjectId.isValid(product)) {
          throw new Error('Id de produto inválido!');
        }
        if (!ObjectId.isValid(id)) {
          throw new Error('Usuário inválido!');
        }
        const { response } = await createOrUpdateShoppingCart({ product, quantity, owner: id });
        if (response) {
          return res.status(200).send();
        }
        return res.status(400).send();
      } catch (createOrUpdateShoppingCartRouteError) {
        console.log(createOrUpdateShoppingCartRouteError);
        next(createOrUpdateShoppingCartRouteError);
      }
    },
  };
};
