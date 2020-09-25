exports.findBranchFactory = ({ Branch } = {}) => {
  return {
    findBranch: async () => {
      try {
        const branch = await Branch.find();
        return { branch };
      } catch (findBranchError) {
        console.log(findBranchError);
        throw new Error('Não foi possivel obter a filial!');
      }
    },
  };
};
