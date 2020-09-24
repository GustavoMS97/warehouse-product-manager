exports.createLocationFactory = ({ Location } = {}) => {
  return {
    createLocation: async ({ name, address, branch } = {}) => {
      try {
        const locationRes = await Location.create({ name, address, branch });
        return { location: locationRes };
      } catch (createLocationError) {
        console.log(createLocationError);
        throw new Error('Não foi possivel criar o local');
      }
    },
  };
};
