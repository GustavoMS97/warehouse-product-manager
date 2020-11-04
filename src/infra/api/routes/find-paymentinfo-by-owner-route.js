const ObjectId = require('mongoose').Types.ObjectId;

exports.findPaymentInfoByOwnerRouteFactory = ({ findPaymentInfoByOwner } = {}) => {
  return {
    findPaymentInfoByOwnerRoute: async (req, res, next) => {
      try {
        const { id } = req.token_data;
        if (!ObjectId.isValid(id)) {
          throw new Error('Usuário inválido!');
        }
        const { paymentInfo } = await findPaymentInfoByOwner({ id });
        return res.status(200).send({ paymentInfo });
      } catch (findLocationByBranchRouteError) {
        console.log(findLocationByBranchRouteError);
        next(findLocationByBranchRouteError);
      }
    },
  };
};
