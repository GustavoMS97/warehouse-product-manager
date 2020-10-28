exports.findActiveShoppingCartFactory = ({ ShoppingCart } = {}) => {
  return {
    findActiveShoppingCart: async ({ owner } = {}) => {
      try {
        const shoppingCart = await ShoppingCart.find({ owner, isActive: true });
        return { shoppingCart };
      } catch (findShoppingCartByIdError) {
        console.log(findShoppingCartByIdError);
        throw findShoppingCartByIdError;
      }
    },
  };
};
