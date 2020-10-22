exports.findAllProductRouteFactory = ({ findAllProduct } = {}) => {
  return {
    findAllProductRoute: async (req, res, next) => {
      try {
        const { product } = await findAllProduct();
        return res.status(200).send({ product });
      } catch (findProductRouteError) {
        console.log(findProductRouteError);
        next(findProductRouteError);
      }
    },
  };
};
