const { deleteModel } = require('mongoose');

exports.findProductByWareHouseFactory = ({ Product, Warehouse } = {}) => {
  return {
    findProductByWareHouse: async ({ warehouseId } = {}) => {
      try {
        const products = await Product.find({ warehouse: warehouseId });
        const wareHouse = await Warehouse.findOne({ _id: warehouseId });
        if (wareHouse.isThirdParty) {
          products.forEach((product) => {
            delete product.calculatedPrice;
          });
        }
        return { products };
      } catch (findProductByWareHouseError) {
        console.log(findProductByWareHouseError);
        throw new Error('Não foi possivel obter o produto!');
      }
    },
  };
};
