exports.findAllProductFactory = ({ Product } = {}) => {
  return {
    findAllProduct: async () => {
      try {
        const product = await Product.find();
        return { product };
      } catch (findProductError) {
        console.log(findProductError);
        throw new Error('Não foi possivel obter todos os Produtos!');
      }
    },
  };
};
