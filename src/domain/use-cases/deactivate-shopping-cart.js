exports.deactivateShoppingCartFactory = ({ ShoppingCart } = {}) => {
  return {
    deactivateShoppingCart: async ({ id } = {}) => {
      try {
        const response = await ShoppingCart.update({ _id: id }, { isActive: false });
        return { response: response.n && response.n > 0 && response.nModified > 0 };
      } catch (deactivateShoppingCartError) {
        console.log(deactivateShoppingCartError);
        throw deactivateShoppingCartError;
      }
    },
  };
};
