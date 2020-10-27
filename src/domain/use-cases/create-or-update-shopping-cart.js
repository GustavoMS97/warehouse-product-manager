exports.createOrUpdateShoppingCartFactory = ({ ShoppingCart, createShoppingCart, updateShoppingCart } = {}) => {
  return {
    createOrUpdateShoppingCart: async ({ owner, product, quantity } = {}) => {
      try {
        const ownerShoppingCart = await ShoppingCart.find({ owner, isActive: true });
        let shoppingCartResponse;
        if (Array.isArray(ownerShoppingCart) && ownerShoppingCart.length > 0) {
          let { response } = await updateShoppingCart({
            ownerShoppingCart: ownerShoppingCart[0],
            product,
            quantity,
          });
          shoppingCartResponse = response;
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
