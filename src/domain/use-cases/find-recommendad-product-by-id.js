exports.findRecommendedProductByIdFactory = ({ Checkout } = {}) => {
  return {
    findRecommendedProductById: async ({ id } = {}) => {
      try {
        var checkout = await Checkout.find({ owner: id });
        return { checkout };
      } catch (findRecommendedProductByIdError) {
        console.log(findRecommendedProductByIdError);
        throw new Error('Não foi possivel obter as recomendações!');
      }
    },
  };
};
