const ObjectId = require('mongoose').Types.ObjectId;

exports.findRecommendedProductByIdRouteFactory = ({ findRecommendedProductById } = {}) => {
  return {
    findRecommendedProductByIdRoute: async (req, res, next) => {
      try {
        const { id } = req.token_data;
        if (!ObjectId.isValid(id)) {
          throw new Error('Usuário inválido!');
        }
        const { productsRecommended } = await findRecommendedProductById({ id });
        return res.status(200).send({ productsRecommended });
      } catch (findRecommendedProductByIdRouteError) {
        console.log(findRecommendedProductByIdRouteError);
        next(findRecommendedProductByIdRouteError);
      }
    },
  };
};
