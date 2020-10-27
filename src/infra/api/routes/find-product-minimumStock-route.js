exports.findMinimumStockProductRouteFactory = ({ findMinimumStockProduct } = {}) => {
  return {
    findMinimumStockProductRoute: async (req, res, next) => {
      try {
        const { productMinimumStock } = await findMinimumStockProduct();
        return res.status(200).send({ productMinimumStock });
      } catch (findMinimumStockProductRouteError) {
        console.log(findMinimumStockProductRouteError);
        next(findMinimumStockProductRouteError);
      }
    },
  };
};
