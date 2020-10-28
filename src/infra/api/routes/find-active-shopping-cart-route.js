const ObjectId = require('mongoose').Types.ObjectId;

exports.findActiveShoppingCartRouteFactory = ({ findActiveShoppingCart } = {}) => {
  return {
    findActiveShoppingCartRoute: async (req, res, next) => {
      try {
        const { id } = req.token_data;
        if (!ObjectId.isValid(id)) {
          throw new Error('Usuário inválido!');
        }
        const { shoppingCart } = await findActiveShoppingCart({ owner: id });
        return res.status(200).send({ shoppingCart });
      } catch (findShoppingCartByIdRouteError) {
        console.log(findShoppingCartByIdRouteError);
        next(findShoppingCartByIdRouteError);
      }
    },
  };
};
