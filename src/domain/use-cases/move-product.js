const joi = require('joi');
const { PRODUCT_MOVEMENT_TYPES } = require('../../constants');

exports.moveProductFactory = ({
  createDocument,
  findProductByCode,
  createProduct,
  updateProductProvidersById,
  createProductMovement,
  processMovements,
} = {}) => {
  return {
    moveProduct: async ({ params } = {}) => {
      try {
        const {
          documentObservation,
          documentCode,
          productName,
          productCode,
          productUnitOfMeasurement,
          productProvider,
          productWarehouse,
          productCategory,
          productMinimumInStock,
          productMovementQuantity,
          productMovementPrice,
          productMovementType,
        } = joi.attempt(
          params,
          joi.object().keys({
            documentObservation: joi.string().required(),
            documentCode: joi.string().required(),
            productName: joi.string().required(),
            productCode: joi.string().required(),
            productUnitOfMeasurement: joi.string(),
            productProvider: joi.string().required(),
            productWarehouse: joi.string().required(),
            productCategory: joi.string(),
            productMinimumInStock: joi.number().required(),
            productMovementQuantity: joi.number().positive().integer().required(),
            productMovementPrice: joi.number().positive().required(),
            productMovementType: joi
              .number()
              .positive()
              .integer()
              .valid(...PRODUCT_MOVEMENT_TYPES.map((i) => i.id))
              .required(),
          }),
        );
        const { document } = await createDocument({ code: documentCode, observation: documentObservation });
        let { product } = await findProductByCode({ code: productCode });
        if (!product) {
          const { product: productResponse } = await createProduct({
            name: productName,
            code: productCode,
            calculatedPrice: 0,
            totalQuantity: 0,
            unitOfMeasurement: productUnitOfMeasurement,
            provider: productProvider,
            warehouse: productWarehouse,
            category: productCategory,
            minimumInStock: productMinimumInStock,
          });
          product = productResponse;
        } else {
          const response = await updateProductProvidersById({ productId: product._id, provider: productProvider });
          if (!response) {
            console.log(new Error('Lista de fornecedores não foi atualizada com sucesso'));
          }
        }
        const { productMovement } = await createProductMovement({
          quantity: productMovementQuantity,
          price: productMovementPrice,
          document: document._id,
          product: product._id,
          type: productMovementType,
        });
        const { response } = await processMovements({ productId: product._id });
        return { success: response, productMovement };
      } catch (moveProductError) {
        console.log(moveProductError);
        throw new Error('Não foi possível mover o produto!');
      }
    },
  };
};
