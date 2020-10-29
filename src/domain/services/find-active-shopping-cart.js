exports.findActiveShoppingCartFactory = ({ ShoppingCart } = {}) => {
  return {
    findActiveShoppingCart: async ({ owner } = {}) => {
      try {
        const shoppingCart = await ShoppingCart.find({ owner, isActive: true }).populate('productsQuantity.product');
        return { shoppingCart };
      } catch (findShoppingCartByIdError) {
        console.log(findShoppingCartByIdError);
        throw findShoppingCartByIdError;
      }
    },
  };
};
