exports.createProposalFactory = ({ Proposal } = {}) => {
  return {
    createProposal: async ({ provider, paymentDate, deliveryDate, accepted, quote } = {}) => {
      try {
        const proposal = await Proposal.create({
          provider,
          paymentDate,
          deliveryDate,
          accepted,
          quote,
        });
        return { proposal };
      } catch (createProposalError) {
        console.log(createProposalError);
        throw new Error('Não foi possivel criar uma proposta!');
      }
    },
  };
};
