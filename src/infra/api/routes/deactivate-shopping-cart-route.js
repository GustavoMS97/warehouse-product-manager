const ObjectId = require('mongoose').Types.ObjectId;

exports.deactivateShoppingCartRouteFactory = ({ deactivateShoppingCart } = {}) => {
  return {
    deactivateShoppingCartRoute: async (req, res, next) => {
      try {
        const { shoppingCartId } = req.params;
        if (!ObjectId.isValid(shoppingCartId)) {
          throw new Error('Carrinho inválido!');
        }
        const { response } = await deactivateShoppingCart({ id: shoppingCartId });
        return res.status(response ? 200 : 400).send({ response });
      } catch (deactivateShoppingCartRouteError) {
        console.log(deactivateShoppingCartRouteError);
        next(deactivateShoppingCartRouteError);
      }
    },
  };
};
