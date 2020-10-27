exports.updateShoppingCartFactory = ({ ShoppingCart } = {}) => {
  return {
    updateShoppingCart: async ({ ownerShoppingCart, product, quantity } = {}) => {
      try {
        const isInArray = ownerShoppingCart.productsQuantity.filter((p) => p.product === product).length > 0;
        if (isInArray) {
          ownerShoppingCart.productsQuantity.push({ product, quantity });
        } else {
          for (let i = 0; i < ownerShoppingCart.productsQuantity.length; i++) {
            if (ownerShoppingCart.productsQuantity[i].product === product) {
              if (quantity < 0 && -1 * quantity > ownerShoppingCart.productsQuantity[i].quantity) {
                ownerShoppingCart.productsQuantity[i].quantity = 0;
              } else {
                ownerShoppingCart.productsQuantity[i].quantity += quantity;
              }
              break;
            }
          }
        }
        const response = await ShoppingCart.update({ _id: ownerShoppingCart._id }, ownerShoppingCart);
        console.log(response);
        return { response: response.n && response.n > 0 };
      } catch (updateShoppingCartError) {
        console.log(updateShoppingCartError);
        throw updateShoppingCartError;
      }
    },
  };
};
