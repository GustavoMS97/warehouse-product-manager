exports.createShoppingCartFactory = ({ ShoppingCart } = {}) => {
  return {
    createShoppingCart: async ({ owner, product, quantity } = {}) => {
      try {
        const shoppingCart = await ShoppingCart.create({ owner, product, quantity });
        return { shoppingCart };
      } catch (createShoppingCartError) {
        console.log(createShoppingCartError);
        throw createShoppingCartError;
      }
    },
  };
};
