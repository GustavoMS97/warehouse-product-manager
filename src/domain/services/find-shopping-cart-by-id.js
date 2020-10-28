exports.findShoppingCartByIdFactory = ({ ShoppingCart } = {}) => {
  return {
    findShoppingCartById: async ({ id } = {}) => {
      try {
        const shoppingCart = await ShoppingCart.find({ _id: id });
        return { shoppingCart };
      } catch (findShoppingCartByIdError) {
        console.log(findShoppingCartByIdError);
        throw findShoppingCartByIdError;
      }
    },
  };
};
