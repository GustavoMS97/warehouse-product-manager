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
            location: joi.string().required(),
            branch: joi.string().required(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const { name, location, branch } = reqBodyValues;
        if (!ObjectId.isValid(branch)) {
          throw new Error('Id de filial inválido!');
        }
        const { location: locationRes } = await createLocation({ name, location, branch });
        return res.status(201).send({ location: locationRes });
      } catch (createBranchRouteError) {
        console.log(createBranchRouteError);
        next(createBranchRouteError);
      }
    },
  };
};
