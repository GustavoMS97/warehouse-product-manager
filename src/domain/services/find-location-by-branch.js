exports.findLocationByBranchFactory = ({ Location } = {}) => {
  return {
    findLocationByBranch: async ({ branchId } = {}) => {
      try {
        const location = await Location.find({ branch: branchId });
        return { location };
      } catch (findLocationByBranchError) {
        console.log(findLocationByBranchError);
        throw new Error('Não foi possivel obter o local!');
      }
    },
  };
};
