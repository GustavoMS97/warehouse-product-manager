const { PRODUCT_MOVEMENT_TYPE } = require('../../constants');

exports.createProductMovementFactory = ({ ProductMovement, Product } = {}) => {
  return {
    createProductMovement: async ({ quantity, price, document, product, type } = {}) => {
      try {
        const productItem = await Product.findById(product);
        if (!productItem) {
          throw new Error('Produto referenciado na movimentação nao existe');
        }
        if (
          [
            PRODUCT_MOVEMENT_TYPE.SALE.id,
            PRODUCT_MOVEMENT_TYPE.INTERNAL_CONSUMPTION.id,
            PRODUCT_MOVEMENT_TYPE.FABRICATION.id,
            PRODUCT_MOVEMENT_TYPE.DEVOLUTION.id,
            PRODUCT_MOVEMENT_TYPE.LOST_PRODUCT.id,
          ].includes(type) &&
          quantity > productItem.totalQuantity
        ) {
          throw new Error('Não é possivel fazer uma retirada maior do que o valor que consta em estoque');
        }
        const productMovement = await ProductMovement.create({ quantity, price, document, product, type });
        return { productMovement };
      } catch (createProductMovementError) {
        console.log(createProductMovementError);
        throw createProductMovementError;
      }
    },
  };
};
