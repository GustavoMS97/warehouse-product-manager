exports.findWareHouseByLocationRouteFactory = ({ findWareHouseByLocation } = {}) => {
  return {
    findWareHouseByLocationRoute: async (req, res, next) => {
      try {
        const { locationId } = req.params;
        const { wareHouse } = await findWareHouseByLocation({ locationId });
        return res.status(200).send({ wareHouse });
      } catch (findWareHouserByLocationRouteError) {
        console.log(findWareHouserByLocationRouteError);
        next(findWareHouserByLocationRouteError);
      }
    },
  };
};
