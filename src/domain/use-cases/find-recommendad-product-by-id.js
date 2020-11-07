exports.findRecommendedProductByIdFactory = ({ Checkout, Product } = {}) => {
  return {
    findRecommendedProductById: async ({ id } = {}) => {
      try {
        const checkout = await Checkout.find({ owner: id }).populate('productMovements');
        let allProductMovements = [];
        for (let i = 0; i < checkout.length; i++) {
          const checkoutItem = checkout[i];
          const { productMovements } = checkoutItem;
          allProductMovements.push(...productMovements);
        }
        let allProducts = [];
        for (let i = 0; i < allProductMovements.length; i++) {
          const productMovementItem = allProductMovements[i];
          allProducts.push(productMovementItem.product);
        }
        const products = await Product.find({ _id: { $in: allProducts } });
        let allCategory = [];
        for (let i = 0; i < products.length; i++) {
          const productsItem = products[i];
          allCategory.push(productsItem.category);
        }
        const productsRecommended = await Product.find({ category: { $in: allCategory } });
        return { productsRecommended };
      } catch (findRecommendedProductByIdError) {
        console.log(findRecommendedProductByIdError);
        throw new Error('Não foi possivel obter as recomendações!');
      }
    },
  };
};
