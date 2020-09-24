const joi = require('joi');
const { PRODUCT_MOVEMENT_TYPES } = require('../../../constants');

exports.moveProductRouteFactory = ({ moveProduct } = {}) => {
  return {
    moveProductRoute: async (req, res, next) => {
      try {
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            documentObservation: joi.string().required(),
            documentCode: joi.string().required(),
            productName: joi.string().required(),
            productCode: joi.string().required(),
            productUnitOfMeasurement: joi.string(),
            productProvider: joi.string().required(),
            productWarehouse: joi.string().required(),
            productMovementQuantity: joi.number().positive().integer().required(),
            productMovementPrice: joi.number().positive().required(),
            productMovementType: joi
              .number()
              .positive()
              .integer()
              .valid(...PRODUCT_MOVEMENT_TYPES.map((i) => i.id))
              .required(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const {
          documentObservation,
          documentCode,
          productName,
          productCode,
          productUnitOfMeasurement,
          productProvider,
          productWarehouse,
          productMovementQuantity,
          productMovementPrice,
          productMovementType,
        } = reqBodyValues;
        const { success } = await moveProduct({
          params: {
            documentObservation,
            documentCode,
            productName,
            productCode,
            productUnitOfMeasurement,
            productProvider,
            productWarehouse,
            productMovementQuantity,
            productMovementPrice,
            productMovementType,
          },
        });
        if (success) {
          return res.status(200).send({ response: 'Movimentação foi realizada com sucesso' });
        }
        return res.status(400).send({ response: 'Movimentação não foi realizada com sucesso' });
      } catch (moveProductError) {
        console.log(moveProductError);
        next(moveProductError);
      }
    },
  };
};
