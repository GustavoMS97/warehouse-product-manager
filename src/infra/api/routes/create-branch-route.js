const joi = require('joi');

exports.createBranchRouteFactory = ({ createBranch } = {}) => {
  return {
    createBranchRoute: async (req, res, next) => {
      try {
        const { value: reqBodyValues, error: envVarsValidationError } = joi
          .object()
          .keys({
            name: joi.string().required(),
          })
          .required()
          .validate(req.body);
        if (envVarsValidationError) {
          throw envVarsValidationError;
        }
        const { name } = reqBodyValues;
        const { branch } = await createBranch({ name });
        return res.status(201).send({ branch });
      } catch (createBranchRouteError) {
        console.log(createBranchRouteError);
        next(createBranchRouteError);
      }
    },
  };
};
