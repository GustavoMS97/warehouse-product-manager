exports.findAllCampaingRouteFactory = ({ findAllCampaing } = {}) => {
  return {
    findAllCampaingRoute: async (req, res, next) => {
      try {
        const { campaing } = await findAllCampaing();
        return res.status(200).send({ campaing });
      } catch (findCampaingRouteError) {
        console.log(findCampaingRouteError);
        next(findCampaingRouteError);
      }
    },
  };
};
