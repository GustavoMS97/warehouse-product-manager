const randomstring = require('randomstring');
const { PRODUCT_MOVEMENT_TYPE } = require('../../constants');

exports.processCheckoutFactory = ({ Checkout, moveProduct, findShoppingCartById, processMovements } = {}) => {
  return {
    processCheckout: async ({ shoppingCartId, paymentInfoId, owner } = {}) => {
      try {
        const { shoppingCart } = await findShoppingCartById({ id: shoppingCartId });
        const { productsQuantity } = shoppingCart;
        if (Array.isArray(productsQuantity) && productsQuantity.length > 0) {
          const productMovements = [];
          for (let i = 0; i < productsQuantity.length; i++) {
            const { product, quantity } = productsQuantity[i];
            const hash = randomstring.generate({ charset: 'alphabetic' });
            const { success, productMovement } = await moveProduct({
              params: {
                documentObservation: `nfe-${hash}`,
                documentCode: hash,
                productName: product.name,
                productCode: product.code,
                productUnitOfMeasurement: product.unitOfMeasurement,
                productProvider: '-',
                productWarehouse: product.warehouse.toString(),
                productCategory: product.category.toString(),
                productMinimumInStock: product.minimumInStock || 0,
                productMovementQuantity: quantity,
                productMovementPrice: product.calculatedPrice,
                productMovementType: PRODUCT_MOVEMENT_TYPE.SALE.id,
              },
            });
            if (!success) {
              throw new Error(`Erro ao movimentar ${product.code} para venda`);
            }
            productMovements.push(productMovement);
          }
          for (let i = 0; i < productMovements.length; i++) {
            const productMovement = productMovements[i];
            const { response } = await processMovements({ productId: productMovement.product });
            if (!response) {
              throw new Error(`Erro ao processar as movimentações de ${productMovement.product}`);
            }
          }
          const checkout = await Checkout.create({ owner, productMovements, paymentInfo: paymentInfoId });
          return { checkout };
        } else {
          throw new Error('Carrinho com lista de produtos vazia ou inválida.');
        }
      } catch (processCheckoutError) {
        console.log(processCheckoutError);
        throw processCheckoutError;
      }
    },
  };
};
