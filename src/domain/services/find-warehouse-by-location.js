exports.findWarehouseByLocationFactory = ({ Warehouse } = {}) => {
  return {
    findWareHouseByLocation: async ({ locationId } = {}) => {
      try {
        const wareHouse = await Warehouse.find({ location: locationId });
        return { wareHouse };
      } catch (findWarehouseByLocationError) {
        console.log(findWarehouseByLocationError);
        throw new Error('Não foi possivel obter o deposito!');
      }
    },
  };
};
