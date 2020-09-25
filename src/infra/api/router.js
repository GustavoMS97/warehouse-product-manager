/* eslint-disable no-unused-vars */
exports.routerFactory = ({
  createBranchRoute,
  createLocationRoute,
  createWarehouseRoute,
  moveProductRoute,
  findBranchRoute,
  findLocationByBranchRoute,
  findWareHouseByLocationRoute,
  findProductMovementByProductRoute,
  findProductByWareHouseRoute,
} = {}) => {
  return {
    /**
     * @param {{ app: import('express').Express() }} app
     */
    apiRouter: ({ app }) => {
      app.post('/branch', createBranchRoute);
      app.post('/location', createLocationRoute);
      app.post('/warehouse', createWarehouseRoute);
      app.post('/move-product', moveProductRoute);
      app.get('/branch', findBranchRoute);
      app.get('/location/:branchId', findLocationByBranchRoute);
      app.get('/warehouse/:locationId', findWareHouseByLocationRoute);
      app.get('/product/:warehouseId', findProductByWareHouseRoute);
      app.get('/product-movement/:productId', findProductMovementByProductRoute);
      app.use((error, req, res, next) => {
        return res.status(500).send({ message: error.message });
      });
    },
  };
};
