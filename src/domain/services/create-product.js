exports.createProductFactory = ({ Product } = {}) => {
  return {
    createProduct: async ({
      name,
      code,
      calculatedPrice,
      totalQuantity,
      unitOfMeasurement,
      provider,
      warehouse,
      category,
      minimumInStock,
    } = {}) => {
      try {
        const product = await Product.create({
          name,
          code,
          calculatedPrice,
          totalQuantity,
          unitOfMeasurement,
          providers: [provider],
          warehouse,
          category,
          minimumInStock,
        });
        return { product };
      } catch (createProductError) {
        console.log(createProductError);
        throw new Error('Não foi possivel criar o produto');
      }
    },
  };
};
