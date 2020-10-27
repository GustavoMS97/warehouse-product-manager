exports.createOrUpdateShoppingCartFactory = ({ ShoppingCart, createShoppingCart, updateShoppingCart } = {}) => {
  return {
    createOrUpdateShoppingCart: async ({ owner, product, quantity } = {}) => {
      try {
        const ownerShoppingCart = await ShoppingCart.find({ owner, isActive: true });
        console.log(ownerShoppingCart);
        let shoppingCartResponse;
        if (Array.isArray(ownerShoppingCart) && ownerShoppingCart.length > 0) {
          let { shoppingCart } = await updateShoppingCart({
            ownerShoppingCart: ownerShoppingCart[0],
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
