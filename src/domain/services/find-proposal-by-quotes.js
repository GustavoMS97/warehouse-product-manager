exports.findProposalByQuotesFactory = ({ Proposal } = {}) => {
  return {
    findProposalByQuotes: async ({ quoteId } = {}) => {
      try {
        const quotes = await Proposal.find({ quote: quoteId });
        return { quotes };
      } catch (findProposalByQuotesError) {
        console.log(findProposalByQuotesError);
        throw new Error('Não foi possivel obter as propostas da cotação enviada!');
      }
    },
  };
};
