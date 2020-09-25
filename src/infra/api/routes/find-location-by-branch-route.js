exports.findLocationByBranchRouteFactory = ({ findLocationByBranch } = {}) => {
  return {
    findLocationByBranchRoute: async (req, res, next) => {
      try {
        const { branchId } = req.params;
        const { location } = await findLocationByBranch({ branchId });
        return res.status(200).send({ location });
      } catch (createBranchRouteError) {
        console.log(createBranchRouteError);
        next(createBranchRouteError);
      }
    },
  };
};
