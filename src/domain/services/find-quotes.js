exports.findQuotesFactory = ({ Quote } = {}) => {
  return {
    findQuotes: async () => {
      try {
        const quotes = await Quote.find();
        return { quotes };
      } catch (findQuotesError) {
        console.log(findQuotesError);
        throw new Error('Não foi possivel obter as cotações!');
      }
    },
  };
};
