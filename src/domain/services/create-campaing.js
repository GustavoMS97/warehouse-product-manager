exports.createCampaingFactory = ({ Campaing } = {}) => {
  return {
    createCampaing: async ({ name, products } = {}) => {
      try {
        const campaing = await Campaing.create({ name, products, isActive: true });
        if (campaing) {
          console.log(campaing._id);
          // Campanha nao está atualizando os outros Ids.
          // const desactiveCampaign = await Campaing.find({ _id: { $ne: campaing._id } });
          let doc = await Campaing.updateMany({ _id: { $ne: campaing._id } }, { isActive: false });
          console.log('doc', doc);
        }
        return { campaing };
      } catch (createCampaingError) {
        console.log(createCampaingError);
        throw new Error('Não foi possivel criar a campanha!');
      }
    },
  };
};
