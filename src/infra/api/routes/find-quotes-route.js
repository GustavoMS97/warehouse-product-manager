exports.findQuotesRouteFactory = ({ findQuotes } = {}) => {
  return {
    findQuotesRoute: async (req, res, next) => {
      try {
        const { quotes } = await findQuotes();
        return res.status(200).send({ quotes });
      } catch (findQuotesRouteError) {
        console.log(findQuotesRouteError);
        next(findQuotesRouteError);
      }
    },
  };
};
