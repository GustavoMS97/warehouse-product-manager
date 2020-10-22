exports.createCampaingFactory = ({ Campaing } = {}) => {
  return {
    createCampaing: async ({ name, products } = {}) => {
      try {
        const campaing = await Campaing.create({ name, products, isActive: true });
        if (campaing) {
          await Campaing.updateMany({ _id: { $ne: campaing._id } }, { isActive: false });
        }
        return { campaing };
      } catch (createCampaingError) {
        console.log(createCampaingError);
        throw new Error('Não foi possivel criar a campanha!');
      }
    },
  };
};
