exports.findProductMovementByProductFactory = ({ ProductMovement } = {}) => {
  return {
    findProductMovementByProduct: async ({ productId } = {}) => {
      try {
        const productMovement = await ProductMovement.find({ product: productId }).populate('document');
        return { productMovement };
      } catch (findProductMovementByProductError) {
        console.log(findProductMovementByProductError);
        throw new Error('Não foi possivel obter a movimentação do produto!');
      }
    },
  };
};
