exports.createProposalProductFactory = ({ ProposalProduct } = {}) => {
  return {
    createProposalProduct: async ({
      proposal,
      name,
      code,
      quantity,
      price,
      unitOfMeasurement,
      category,
      provider,
      minimumInStock,
    } = {}) => {
      try {
        const proposalProduct = await ProposalProduct.create({
          proposal,
          name,
          code,
          quantity,
          unitOfMeasurement,
          category,
          price,
          providers: [provider],
          minimumInStock,
        });
        return { proposalProduct };
      } catch (createProposalProductError) {
        console.log(createProposalProductError);
        throw new Error('Não foi possivel criar um produto da proposta');
      }
    },
  };
};
