/* eslint-disable no-unused-vars */
exports.routerFactory = ({ createBranchRoute, createLocationRoute, createWarehouseRoute, moveProductRoute } = {}) => {
  return {
    /**
     * @param {{ app: import('express').Express() }} app
     */
    apiRouter: ({ app }) => {
      app.post('/branch', createBranchRoute);
      app.post('/location', createLocationRoute);
      app.post('/warehouse', createWarehouseRoute);
      app.post('/move-product', moveProductRoute);
      app.use((error, req, res, next) => {
        return res.status(500).send({ message: error.message });
      });
    },
  };
};
