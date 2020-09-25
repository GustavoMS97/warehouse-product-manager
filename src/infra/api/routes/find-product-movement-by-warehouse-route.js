exports.findProductMovementByProductRouteFactory = ({ findProductMovementByProduct } = {}) => {
  return {
    findProductMovementByProductRoute: async (req, res, next) => {
      try {
        const { productId } = req.params;
        const { productMovement } = await findProductMovementByProduct({ productId });
        return res.status(200).send({ productMovement });
      } catch (findWareHouserByLocationRouteError) {
        console.log(findWareHouserByLocationRouteError);
        next(findWareHouserByLocationRouteError);
      }
    },
  };
};
