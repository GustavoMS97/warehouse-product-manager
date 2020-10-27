exports.createOrUpdateShoppingCartFactory = ({ ShoppingCart, createShoppingCart, updateShoppingCart } = {}) => {
  return {
    createOrUpdateShoppingCart: async ({ owner, product, quantity } = {}) => {
      try {
        const ownerShoppingCart = await ShoppingCart.find({ owner, isActive: true });
        let shoppingCartResponse;
        if (ownerShoppingCart) {
          let { shoppingCart } = await updateShoppingCart({
            ownerShoppingCart,
            owner,
            product,
            quantity,
          });
          shoppingCartResponse = shoppingCart;
        } else {
          let { shoppingCart } = await createShoppingCart({ owner, product, quantity });
          shoppingCartResponse = shoppingCart;
        }
        return { response: shoppingCartResponse };
      } catch (updateShoppingCartError) {
        console.log(updateShoppingCartError);
        throw updateShoppingCartError;
      }
    },
  };
};
