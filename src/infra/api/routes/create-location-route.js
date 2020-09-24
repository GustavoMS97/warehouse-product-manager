const joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createLocationRouteFactory = ({ createLocation } = {}) => {
  return {
    createLocationRoute: async (req, res, next) => {
      try {
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            name: joi.string().required(),
            address: joi.string().required(),
            branch: joi.string().required(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const { name, address, branch } = reqBodyValues;
        if (!ObjectId.isValid(branch)) {
          throw new Error('Id de filial inválido!');
        }
        const { location } = await createLocation({ name, address, branch });
        return res.status(201).send({ location });
      } catch (createBranchRouteError) {
        console.log(createBranchRouteError);
        next(createBranchRouteError);
      }
    },
  };
};
