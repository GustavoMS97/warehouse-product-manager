const multer = require('multer');
/* eslint-disable no-unused-vars */
exports.routerFactory = ({
  createBranchRoute,
  createLocationRoute,
  createWarehouseRoute,
  moveProductRoute,
  productMovementMulterConfig,
  csvFileTypeMiddleware,
  moveProductFileRoute,
  findBranchRoute,
  findLocationByBranchRoute,
  findWareHouseByLocationRoute,
  findProductMovementByProductRoute,
  findProductMovementFileByProductRoute,
  findProductByWareHouseRoute,
  createCategoryRoute,
  findCampaingRoute,
  createCampaingRoute,
  findAllCampaingRoute,
  findAllProductRoute,
  requestAuthenticationMiddleware,
  createOrUpdateShoppingCartRoute,
  findMinimumStockProductRoute,
  findCategoryRoute,
  findActiveShoppingCartRoute,
  findQuotesRoute,
  createQuotesRoute,
  findProposalByQuoteRoute,
  createProposalAndProposalProductRoute,
  deactivateShoppingCartRoute,
  createPaymentInfoRoute,
  findPaymentInfoByOwnerRoute,
  findRecommendedProductByIdRoute,
  processCheckoutRoute,
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
      app.post('/category', createCategoryRoute);
      app.post('/campaing', createCampaingRoute);
      app.post('/quote', createQuotesRoute);
      app.post('/proposal', createProposalAndProposalProductRoute);
      app.post('/paymentInfo', createPaymentInfoRoute);
      app.post(
        '/move-product-file',
        multer(productMovementMulterConfig).single('file'),
        csvFileTypeMiddleware,
        moveProductFileRoute,
      );
      app.get('/branch', findBranchRoute);
      app.get('/location/:branchId', findLocationByBranchRoute);
      app.get('/warehouse/:locationId', findWareHouseByLocationRoute);
      app.get('/product/:warehouseId', findProductByWareHouseRoute);
      app.get('/product-movement/:productId', findProductMovementByProductRoute);
      app.get('/product-movement-file/:productId', findProductMovementFileByProductRoute);
      app.get('/paymentInfo', findPaymentInfoByOwnerRoute);

      app.use(requestAuthenticationMiddleware);
      app.post('/shopping-cart', createOrUpdateShoppingCartRoute);
      app.get('/campaing', findCampaingRoute);
      app.get('/recommendedProduct', findRecommendedProductByIdRoute);
      app.get('/all-campaing', findAllCampaingRoute);
      app.get('/all-product', findAllProductRoute);
      app.get('/category', findCategoryRoute);
      app.get('/productMinimumStock', findMinimumStockProductRoute);
      app.get('/active-shopping-cart', findActiveShoppingCartRoute);
      app.get('/quotes', findQuotesRoute);
      app.get('/proposal/:quoteId', findProposalByQuoteRoute);
      app.patch('/shopping-cart/deactivate/:shoppingCartId', deactivateShoppingCartRoute);
      app.post('/checkout', processCheckoutRoute);
      app.use((error, req, res, next) => {
        return res.status(500).send({ message: error.message });
      });
    },
  };
};
