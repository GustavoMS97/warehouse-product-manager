exports.findCampaingFactory = ({ Campaing } = {}) => {
  return {
    findCampaing: async () => {
      try {
        const campaing = await Campaing.find({ isActive: true }).populate('products');
        return { campaing };
      } catch (findCampaingError) {
        console.log(findCampaingError);
        throw new Error('Não foi possivel obter a campanha!');
      }
    },
  };
};
