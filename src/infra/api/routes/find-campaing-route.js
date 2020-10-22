exports.findCampaingRouteFactory = ({ findCampaing } = {}) => {
  return {
    findCampaingRoute: async (req, res, next) => {
      try {
        const { campaing } = await findCampaing();
        return res.status(200).send({ campaing });
      } catch (createCampaingRouteError) {
        console.log(createCampaingRouteError);
        next(createCampaingRouteError);
      }
    },
  };
};
