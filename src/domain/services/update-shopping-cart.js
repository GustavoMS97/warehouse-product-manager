exports.updateShoppingCartFactory = ({ ShoppingCart } = {}) => {
  return {
    updateShoppingCart: async ({ ownerShoppingCart, product, quantity } = {}) => {
      try {
        console.log(product);
        const isInArray = ownerShoppingCart.productsQuantity.filter((p) => p.product.toString() == product).length > 0;
        console.log('isinarray', isInArray);
        if (!isInArray) {
          ownerShoppingCart.productsQuantity.push({ product, quantity });
        } else {
          for (let i = 0; i < ownerShoppingCart.productsQuantity.length; i++) {
            const item = ownerShoppingCart.productsQuantity[i];
            if (item.product.toString() === product) {
              if (quantity < 0 && -1 * quantity > item.quantity) {
                item.quantity = 0;
              } else {
                item.quantity += quantity;
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
