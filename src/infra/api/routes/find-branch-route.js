exports.findBranchRouteFactory = ({ findBranch } = {}) => {
  return {
    findBranchRoute: async (req, res, next) => {
      try {
        const { branch } = await findBranch();
        return res.status(200).send({ branch });
      } catch (createBranchRouteError) {
        console.log(createBranchRouteError);
        next(createBranchRouteError);
      }
    },
  };
};
