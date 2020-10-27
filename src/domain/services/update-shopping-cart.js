exports.updateShoppingCartFactory = ({ ShoppingCart } = {}) => {
  return {
    updateShoppingCart: async ({ ownerShoppingCart, product, quantity } = {}) => {
      try {
        for (let i = 0; i < ownerShoppingCart.productsQuantity.length; i++) {
          const item = ownerShoppingCart.productsQuantity[i];
          if (item.product === product) {
            if (quantity < 0 && -1 * quantity > item.quantity) {
              item.quantity = 0;
            } else {
              item.quantity += quantity;
            }
            break;
          }
        }
        await ShoppingCart.update({ _id: ownerShoppingCart._id }, ownerShoppingCart);
        return { shoppingCart: ownerShoppingCart };
      } catch (updateShoppingCartError) {
        console.log(updateShoppingCartError);
        throw updateShoppingCartError;
      }
    },
  };
};
