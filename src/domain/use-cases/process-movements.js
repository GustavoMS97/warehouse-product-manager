const { PRODUCT_MOVEMENT_ACTION_TYPE, PRODUCT_MOVEMENT_TYPES } = require('../../constants');

exports.processMovementsFactory = ({ ProductMovement, Product } = {}) => {
  return {
    processMovements: async ({ productId } = {}) => {
      try {
        const movements = await ProductMovement.find({ product: productId });

        const addingMovements = movements.filter((movement) =>
          [
            ...PRODUCT_MOVEMENT_TYPES.filter((i) => i.action === PRODUCT_MOVEMENT_ACTION_TYPE.ADDING).map((i) => i.id),
          ].includes(movement.type),
        );
        const removingMovements = movements.filter((movement) =>
          [
            ...PRODUCT_MOVEMENT_TYPES.filter((i) => i.action === PRODUCT_MOVEMENT_ACTION_TYPE.REMOVING).map(
              (i) => i.id,
            ),
          ].includes(movement.type),
        );

        const totalAddingQuantity = addingMovements.reduce((acc, cur) => {
          return (acc += cur.quantity);
        }, 0);
        const totalPricingQuantity = addingMovements.reduce((acc, cur) => {
          return (acc += cur.price * cur.quantity);
        }, 0);
        const totalRemovingQuantity = removingMovements.reduce((acc, cur) => {
          return (acc += cur.quantity);
        }, 0);

        const calculatedPrice = totalPricingQuantity / totalAddingQuantity || 0;
        const totalQuantity = totalAddingQuantity - totalRemovingQuantity;

        console.log(calculatedPrice, totalQuantity);

        const response = await Product.update({ _id: productId }, { calculatedPrice, totalQuantity });
        return { response: response.n && response.n > 0 };
      } catch (processMovementsError) {
        console.log(processMovementsError);
        throw new Error('Não foi possivel realizar o processamento das movimentações do produto com sucesso');
      }
    },
  };
};
