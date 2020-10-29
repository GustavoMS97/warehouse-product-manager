exports.createQuotesFactory = ({ Quotes } = {}) => {
  return {
    createQuotes: async ({ description, warehouse, user } = {}) => {
      try {
        const quotes = await Quotes.create({ description, warehouse, user });
        return { quotes };
      } catch (createQuotesError) {
        console.log(createQuotesError);
        throw new Error('Não foi possivel criar uma cotação!');
      }
    },
  };
};
