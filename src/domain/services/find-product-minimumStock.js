exports.findMinimumStockProductFactory = ({ Product } = {}) => {
  return {
    findMinimumStockProduct: async () => {
      try {
        const product = await Product.find();
        const productMinimumStock = product.filter((product) => product.totalQuantity <= product.minimumInStock);
        return { productMinimumStock };
      } catch (findMinimumStockProductError) {
        console.log(findMinimumStockProductError);
        throw new Error('Não foi possivel obter os produtos abaixo do estoque minimo!');
      }
    },
  };
};
