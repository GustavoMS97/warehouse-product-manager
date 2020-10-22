exports.findAllCampaingFactory = ({ Campaing } = {}) => {
  return {
    findAllCampaing: async () => {
      try {
        const campaing = await Campaing.find().populate('products');
        return { campaing };
      } catch (findCampaingError) {
        console.log(findCampaingError);
        throw new Error('Não foi possivel obter todas as campanhas!');
      }
    },
  };
};
