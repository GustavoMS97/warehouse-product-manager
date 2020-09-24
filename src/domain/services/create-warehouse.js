exports.createWarehouseFactory = ({ Warehouse } = {}) => {
  return {
    createWarehouse: async ({ name, isThirdParty, location } = {}) => {
      try {
        const warehouse = await Warehouse.create({ name, isThirdParty, location });
        return { warehouse };
      } catch (createWarehouseError) {
        console.log(createWarehouseError);
        throw new Error('Não foi possível criar o deposito');
      }
    },
  };
};
