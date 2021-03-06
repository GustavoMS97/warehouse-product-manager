exports.findProductByWareHouseRouteFactory = ({ findProductByWareHouse } = {}) => {
  return {
    findProductByWareHouseRoute: async (req, res, next) => {
      try {
        const { warehouseId } = req.params;
        const { products } = await findProductByWareHouse({ warehouseId });
        return res.status(200).send({ products });
      } catch (findProductByWareHouseRouteError) {
        console.log(findProductByWareHouseRouteError);
        next(findProductByWareHouseRouteError);
      }
    },
  };
};
