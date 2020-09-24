exports.findProductByCodeFactory = ({ Product } = {}) => {
  return {
    findProductByCode: async ({ code } = {}) => {
      try {
        const product = await Product.findOne({ code });
        return { product };
      } catch (findProductByCodeError) {
        console.log(findProductByCodeError);
        throw new Error('Não foi possivel encontrar um produto pelo codigo especificado.');
      }
    },
  };
};
