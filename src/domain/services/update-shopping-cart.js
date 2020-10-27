exports.updateShoppingCartFactory = ({ ShoppingCart } = {}) => {
  return {
    updateShoppingCart: async ({ ownerShoppingCart, product, quantity } = {}) => {
      try {
        console.log(product);
        const isInArray =
          ownerShoppingCart.productsQuantity.map((p) => {
            console.log(p);
            console.log(typeof p.product);
            console.log(p.product + ' === ' + product);
            if (product === p.product) {
              return p;
            }
          }).length > 0;
        console.log('isinarray', isInArray);
        if (!isInArray) {
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
        return { response: response.n && response.n > 0 };
      } catch (updateShoppingCartError) {
        console.log(updateShoppingCartError);
        throw updateShoppingCartError;
      }
    },
  };
};
