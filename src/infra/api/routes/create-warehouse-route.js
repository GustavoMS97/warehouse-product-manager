const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createWarehouseRouteFactory = ({ createWarehouse } = {}) => {
  return {
    createWarehouseRoute: async (req, res, next) => {
      try {
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            name: joi.string().required(),
            isThirdParty: joi.boolean().required(),
            location: joi.string().required(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const { name, isThirdParty, location } = reqBodyValues;
        if (!ObjectId.isValid(location)) {
          throw new Error('Id de local inválido!');
        }
        const { warehouse } = await createWarehouse({ name, isThirdParty, location });
        return res.status(201).send({ warehouse });
      } catch (createBranchRouteError) {
        console.log(createBranchRouteError);
        next(createBranchRouteError);
      }
    },
  };
};
