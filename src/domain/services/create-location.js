exports.createLocationFactory = ({ Location } = {}) => {
  return {
    createLocation: async ({ name, location, branch } = {}) => {
      try {
        const locationRes = await Location.create({ name, location, branch });
        return { location: locationRes };
      } catch (createLocationError) {
        console.log(createLocationError);
        throw new Error('Não foi possivel criar o local');
      }
    },
  };
};
