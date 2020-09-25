exports.findProductFactory = ({ Product } = {}) => {
  return {
    findProduct: async ({ id } = {}) => {
      try {
        const product = await Product.findById(id);
        return { product };
      } catch (findProductError) {
        console.log(findProductError);
        throw new Error('Não foi possivel obter o Produto!');
      }
    },
  };
};
