exports.findShoppingCartByIdFactory = ({ ShoppingCart } = {}) => {
  return {
    findShoppingCartById: async ({ id } = {}) => {
      try {
        const shoppingCart = await ShoppingCart.findById(id).populate('productsQuantity.product');
        return { shoppingCart };
      } catch (findShoppingCartByIdError) {
        console.log(findShoppingCartByIdError);
        throw findShoppingCartByIdError;
      }
    },
  };
};
