exports.createBranchFactory = ({ Branch } = {}) => {
  return {
    createBranch: async ({ name } = {}) => {
      try {
        const branch = await Branch.create({ name });
        return { branch };
      } catch (createBranchError) {
        console.log(createBranchError);
        throw new Error('Não foi possivel criar a filial!');
      }
    },
  };
};
