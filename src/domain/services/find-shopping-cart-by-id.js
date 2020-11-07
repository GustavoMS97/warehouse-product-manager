exports.findShoppingCartByIdFactory = ({ ShoppingCart } = {}) => {
  return {
    findShoppingCartById: async ({ id } = {}) => {
      try {
        const shoppingCart = await ShoppingCart.find({ _id: id }).populate('productsQuantity.product');
        return { shoppingCart };
      } catch (findShoppingCartByIdError) {
        console.log(findShoppingCartByIdError);
        throw findShoppingCartByIdError;
      }
    },
  };
};
