exports.findCategoryRouteFactory = ({ findCategory } = {}) => {
  return {
    findCategoryRoute: async (req, res, next) => {
      try {
        const { category } = await findCategory();
        return res.status(200).send({ category });
      } catch (findCategoryRouteError) {
        console.log(findCategoryRouteError);
        next(findCategoryRouteError);
      }
    },
  };
};
