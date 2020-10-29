exports.findProposalByQuoteRouteFactory = ({ findProposalByQuotes } = {}) => {
  return {
    findProposalByQuoteRoute: async (req, res, next) => {
      try {
        const { quoteId } = req.params;
        const { proposal } = await findProposalByQuotes({ quoteId });
        return res.status(200).send({ proposal });
      } catch (findProposalByQuoteRouteError) {
        console.log(findProposalByQuoteRouteError);
        next(findProposalByQuoteRouteError);
      }
    },
  };
};
