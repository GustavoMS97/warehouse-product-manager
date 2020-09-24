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
        });
        return { product };
      } catch (createProductError) {
        console.log(createProductError);
        throw new Error('Não foi possivel criar o produto');
      }
    },
  };
};
