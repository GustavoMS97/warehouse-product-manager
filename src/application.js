const { loadEnvironment } = require('./infra/config/environment');

const { apiFactory } = require('./infra/api/api');

const { multerFactory } = require('./infra/sdk/multer');
const { CronJobFactory } = require('./infra/sdk/cronJob');

const { connectToMongoose } = require('./infra/db/mongoose');
const { BranchFactory } = require('./domain/models/Branch');
const { CategoryFactory } = require('./domain/models/Category');
const { CampaingFactory } = require('./domain/models/Campaing');
const { LocationFactory } = require('./domain/models/Location');
const { WarehouseFactory } = require('./domain/models/Warehouse');
const { ProductFactory } = require('./domain/models/Product');
const { DocumentFactory } = require('./domain/models/Document');
const { ProductMovementFactory } = require('./domain/models/ProductMovement');
const { ShoppingCartFactory } = require('./domain/models/ShoppingCart');
const { QuoteFactory } = require('./domain/models/Quote');
const { ProposalFactory } = require('./domain/models/Proposal');
const { ProposalProductFactory } = require('./domain/models/ProposalProduct');
const { CheckoutFactory } = require('./domain/models/Checkout');
const { PaymentInfoFactory } = require('./domain/models/PaymentInfo');

const { createBranchFactory } = require('./domain/services/create-branch');
const { createCategoryFactory } = require('./domain/services/create-category');
const { createCampaingFactory } = require('./domain/services/create-campaing');
const { createLocationFactory } = require('./domain/services/create-location');
const { createWarehouseFactory } = require('./domain/services/create-warehouse');
const { createProductFactory } = require('./domain/services/create-product');
const { createDocumentFactory } = require('./domain/services/create-document');
const { createProductMovementFactory } = require('./domain/services/create-product-movement');
const { updateProductProvidersByIdFactory } = require('./domain/services/update-product-providers-by-id');
const { findProductByCodeFactory } = require('./domain/services/find-product-by-code');
const { findBranchFactory } = require('./domain/services/find-branch');
const { findCampaingFactory } = require('./domain/services/find-campaing');
const { findAllCampaingFactory } = require('./domain/services/find-all-campaing');
const { findLocationByBranchFactory } = require('./domain/services/find-location-by-branch');
const { findWarehouseByLocationFactory } = require('./domain/services/find-warehouse-by-location');
const { findProductMovementByProductFactory } = require('./domain/services/find.product-movement-by-product');
const { findProductByWareHouseFactory } = require('./domain/services/find-product-by-warehouse');
const { findAllProductFactory } = require('./domain/services/find-all-product');
const { createShoppingCartFactory } = require('./domain/services/create-shopping-cart');
const { updateShoppingCartFactory } = require('./domain/services/update-shopping-cart');
const { findMinimumStockProductFactory } = require('./domain/services/find-product-minimumStock');
const { findCategoryFactory } = require('./domain/services/find-category');
const { findQuotesFactory } = require('./domain/services/find-quotes');
const { findProposalByQuotesFactory } = require('./domain/services/find-proposal-by-quotes');
const { createQuotesFactory } = require('./domain/services/create-quotes');
const { createProposalFactory } = require('./domain/services/create-proposal');
const { createProposalProductFactory } = require('./domain/services/create-proposal-product');
const { createPaymentInfoFactory } = require('./domain/services/create-paymentInfo');
const { findPaymentInfoByOwnerFactory } = require('./domain/services/find-paymentInfo-by-owner');
const { findShoppingCartByIdFactory } = require('./domain/services/find-shopping-cart-by-id');

const { processMovementsFactory } = require('./domain/use-cases/process-movements');
const { moveProductFactory } = require('./domain/use-cases/move-product');
const { createOrUpdateShoppingCartFactory } = require('./domain/use-cases/create-or-update-shopping-cart');
const { createProposalAndProposalProductFactory } = require('./domain/use-cases/create-proposal-and-product-proposal');
const { processAbandonmentShoppingCartFactory } = require('./domain/use-cases/process-abandonment-shopping-cart');
const { findRecommendedProductByIdFactory } = require('./domain/use-cases/find-recommendad-product-by-id');
const { processCheckoutFactory } = require('./domain/use-cases/process-checkout');

const { fileTypeMiddlewareFactory } = require('./infra/api/middlewares/file-type-middleware');
const { requestAuthenticationMiddlewareFactory } = require('./infra/api/middlewares/request-authentication');

const { createBranchRouteFactory } = require('./infra/api/routes/create-branch-route');
const { createCategoryRouteFactory } = require('./infra/api/routes/create-category-route');
const { createCampaingRouteFactory } = require('./infra/api/routes/create-campaing-route');
const { createLocationRouteFactory } = require('./infra/api/routes/create-location-route');
const { createWarehouseRouteFactory } = require('./infra/api/routes/create-warehouse-route');
const { moveProductRouteFactory } = require('./infra/api/routes/move-product-route');
const { findBranchRouteFactory } = require('./infra/api/routes/find-branch-route');
const { findCampaingRouteFactory } = require('./infra/api/routes/find-campaing-route');
const { findAllCampaingRouteFactory } = require('./infra/api/routes/find-all-campaing-route');
const { findAllProductRouteFactory } = require('./infra/api/routes/find-all-product-route');
const { findLocationByBranchRouteFactory } = require('./infra/api/routes/find-location-by-branch-route');
const { findWareHouseByLocationRouteFactory } = require('./infra/api/routes/find-warehouse-by-location-route');
const {
  findProductMovementByProductRouteFactory,
} = require('./infra/api/routes/find-product-movement-by-product-route');
const { findProductByWareHouseRouteFactory } = require('./infra/api/routes/find-product-by-warehouse-route');
const {
  findProductMovementFileByProductRouteFactory,
} = require('./infra/api/routes/find-product-movement-file-by-product-route');
const { createOrUpdateShoppingCartRouteFactory } = require('./infra/api/routes/create-or-update-shopping-cart-route');
const { findMinimumStockProductRouteFactory } = require('./infra/api/routes/find-product-minimumStock-route');
const { findCategoryRouteFactory } = require('./infra/api/routes/find-category-route');
const { findQuotesRouteFactory } = require('./infra/api/routes/find-quotes-route');
const { createQuotesRouteFactory } = require('./infra/api/routes/create-quotes-route');
const { findProposalByQuoteRouteFactory } = require('./infra/api/routes/find-proposal-by-quotes-route');
const { createPaymentInfoRouteFactory } = require('./infra/api/routes/create-paymentinfo-route');
const { findPaymentInfoByOwnerRouteFactory } = require('./infra/api/routes/find-paymentinfo-by-owner-route');
const { findRecommendedProductByIdRouteFactory } = require('./infra/api/routes/find-recommended-product-by-id-route');

const { routerFactory } = require('./infra/api/router');
const { moveProductFileRouteFactory } = require('./infra/api/routes/move-product-file-route');
const { getCSVContentInMatrixFactory } = require('./domain/helpers/get-csv-content-in-matrix');
const { getFileContentFactory } = require('./domain/helpers/get-file-content');
const { validateCSVHeadersFactory } = require('./domain/helpers/validate-csv-headers');
const { generateFileFromStringFactory } = require('./domain/helpers/generate-file-from-string');
const { findActiveShoppingCartFactory } = require('./domain/services/find-active-shopping-cart');
const { findActiveShoppingCartRouteFactory } = require('./infra/api/routes/find-active-shopping-cart-route');
const {
  createProposalAndProposalProductRouteFactory,
} = require('./infra/api/routes/create-proposal-and-proposal-product-route');
const { deactivateShoppingCartFactory } = require('./domain/use-cases/deactivate-shopping-cart');
const { deactivateShoppingCartRouteFactory } = require('./infra/api/routes/deactivate-shopping-cart-route');
const { processCheckoutRouteFactory } = require('./infra/api/routes/process-checkout-route');

const application = async () => {
  try {
    const { ENV } = loadEnvironment();

    const { startApi } = apiFactory({ ENV });
    const { app } = await startApi();

    const { multer } = multerFactory({ ENV });
    const { multerConfig: productMovementMulterConfig } = multer({ folder: 'product-movement' });

    const { mongoose } = await connectToMongoose({ ENV });
    const { Branch } = BranchFactory({ mongoose });
    const { Category } = CategoryFactory({ mongoose });
    const { Campaing } = CampaingFactory({ mongoose });
    const { Location } = LocationFactory({ mongoose });
    const { Warehouse } = WarehouseFactory({ mongoose });
    const { Product } = ProductFactory({ mongoose });
    const { Document } = DocumentFactory({ mongoose });
    const { ProductMovement } = ProductMovementFactory({ mongoose });
    const { ShoppingCart } = ShoppingCartFactory({ mongoose });
    const { Quote } = QuoteFactory({ mongoose });
    const { Proposal } = ProposalFactory({ mongoose });
    const { ProposalProduct } = ProposalProductFactory({ mongoose });
    const { Checkout } = CheckoutFactory({ mongoose });
    const { PaymentInfo } = PaymentInfoFactory({ mongoose });

    const { processAbandonmentShoppingCart } = processAbandonmentShoppingCartFactory({ ENV, ShoppingCart });

    const { cronjob } = CronJobFactory({ ENV });
    const { cronJobConfig } = cronjob({
      timeExecuteJob: ENV.TIME_EXECUTE_JOB,
      onJobExecution: processAbandonmentShoppingCart,
    });

    const { getCSVContentInMatrix } = getCSVContentInMatrixFactory();
    const { validateCSVHeaders } = validateCSVHeadersFactory({ getCSVContentInMatrix });
    const { getFileContent } = getFileContentFactory();
    const { generateFileFromString } = generateFileFromStringFactory({ ENV });

    const { createBranch } = createBranchFactory({ Branch });
    const { createCategory } = createCategoryFactory({ Category });
    const { createCampaing } = createCampaingFactory({ Campaing });
    const { createLocation } = createLocationFactory({ Location });
    const { findQuotes } = findQuotesFactory({ Quote });
    const { createQuotes } = createQuotesFactory({ Quote });
    const { findProposalByQuotes } = findProposalByQuotesFactory({ Proposal });
    const { createProposal } = createProposalFactory({ Proposal });
    const { createProposalProduct } = createProposalProductFactory({ ProposalProduct });
    const { createProduct } = createProductFactory({ Product });
    const { createWarehouse } = createWarehouseFactory({ Warehouse });
    const { createDocument } = createDocumentFactory({ Document });
    const { createProductMovement } = createProductMovementFactory({ ProductMovement, Product });
    const { updateProductProvidersById } = updateProductProvidersByIdFactory({ Product });
    const { findProductByCode } = findProductByCodeFactory({ Product });
    const { findBranch } = findBranchFactory({ Branch });
    const { findCampaing } = findCampaingFactory({ Campaing });
    const { findAllCampaing } = findAllCampaingFactory({ Campaing });
    const { findLocationByBranch } = findLocationByBranchFactory({ Location });
    const { findWareHouseByLocation } = findWarehouseByLocationFactory({ Warehouse });
    const { findProductMovementByProduct } = findProductMovementByProductFactory({ ProductMovement });
    const { findProductByWareHouse } = findProductByWareHouseFactory({ Product, Warehouse });
    const { findAllProduct } = findAllProductFactory({ Product });
    const { createShoppingCart } = createShoppingCartFactory({ ShoppingCart });
    const { updateShoppingCart } = updateShoppingCartFactory({ ShoppingCart });
    const { createOrUpdateShoppingCart } = createOrUpdateShoppingCartFactory({
      updateShoppingCart,
      ShoppingCart,
      createShoppingCart,
    });
    const { createProposalAndProposalProduct } = createProposalAndProposalProductFactory({
      createProposal,
      createProposalProduct,
    });
    const { createPaymentInfo } = createPaymentInfoFactory({ PaymentInfo });
    const { findPaymentInfoByOwner } = findPaymentInfoByOwnerFactory({ PaymentInfo });
    const { findShoppingCartById } = findShoppingCartByIdFactory({ ShoppingCart });

    const { findActiveShoppingCart } = findActiveShoppingCartFactory({ ShoppingCart });
    const { findMinimumStockProduct } = findMinimumStockProductFactory({ Product });
    const { findCategory } = findCategoryFactory({ Category });
    const { findRecommendedProductById } = findRecommendedProductByIdFactory({ Checkout, Product });

    const { processMovements } = processMovementsFactory({ ProductMovement, Product });
    const { moveProduct } = moveProductFactory({
      createDocument,
      createProduct,
      createProductMovement,
      findProductByCode,
      updateProductProvidersById,
      processMovements,
    });
    const { deactivateShoppingCart } = deactivateShoppingCartFactory({ ShoppingCart });
    const { processCheckout } = processCheckoutFactory({
      Checkout,
      moveProduct,
      processMovements,
      findShoppingCartById,
    });

    const { fileTypeMiddleware: csvFileTypeMiddleware } = fileTypeMiddlewareFactory({ expectedType: 'text/csv' });
    const { requestAuthenticationMiddleware } = requestAuthenticationMiddlewareFactory();

    const { createBranchRoute } = createBranchRouteFactory({ createBranch });
    const { createCategoryRoute } = createCategoryRouteFactory({ createCategory });
    const { createLocationRoute } = createLocationRouteFactory({ createLocation });
    const { createWarehouseRoute } = createWarehouseRouteFactory({ createWarehouse });
    const { createCampaingRoute } = createCampaingRouteFactory({ createCampaing });
    const { moveProductRoute } = moveProductRouteFactory({ moveProduct });
    const { moveProductFileRoute } = moveProductFileRouteFactory({
      moveProduct,
      getCSVContentInMatrix,
      getFileContent,
      validateCSVHeaders,
    });
    const { findBranchRoute } = findBranchRouteFactory({ findBranch });
    const { findCampaingRoute } = findCampaingRouteFactory({ findCampaing });
    const { findAllCampaingRoute } = findAllCampaingRouteFactory({ findAllCampaing });
    const { findLocationByBranchRoute } = findLocationByBranchRouteFactory({ findLocationByBranch });
    const { findWareHouseByLocationRoute } = findWareHouseByLocationRouteFactory({ findWareHouseByLocation });
    const { findProductMovementByProductRoute } = findProductMovementByProductRouteFactory({
      findProductMovementByProduct,
    });
    const { findProductMovementFileByProductRoute } = findProductMovementFileByProductRouteFactory({
      findProductMovementByProduct,
      generateFileFromString,
    });
    const { findProductByWareHouseRoute } = findProductByWareHouseRouteFactory({ findProductByWareHouse });
    const { findAllProductRoute } = findAllProductRouteFactory({ findAllProduct });
    const { findMinimumStockProductRoute } = findMinimumStockProductRouteFactory({ findMinimumStockProduct });
    const { findCategoryRoute } = findCategoryRouteFactory({ findCategory });
    const { createOrUpdateShoppingCartRoute } = createOrUpdateShoppingCartRouteFactory({ createOrUpdateShoppingCart });
    const { findActiveShoppingCartRoute } = findActiveShoppingCartRouteFactory({ findActiveShoppingCart });
    const { findQuotesRoute } = findQuotesRouteFactory({ findQuotes });
    const { findProposalByQuoteRoute } = findProposalByQuoteRouteFactory({ findProposalByQuotes });
    const { createQuotesRoute } = createQuotesRouteFactory({ createQuotes });
    const { createProposalAndProposalProductRoute } = createProposalAndProposalProductRouteFactory({
      createProposalAndProposalProduct,
    });
    const { deactivateShoppingCartRoute } = deactivateShoppingCartRouteFactory({ deactivateShoppingCart });
    const { createPaymentInfoRoute } = createPaymentInfoRouteFactory({
      createPaymentInfo,
    });
    const { findPaymentInfoByOwnerRoute } = findPaymentInfoByOwnerRouteFactory({
      findPaymentInfoByOwner,
    });
    const { findRecommendedProductByIdRoute } = findRecommendedProductByIdRouteFactory({ findRecommendedProductById });
    const { processCheckoutRoute } = processCheckoutRouteFactory({ processCheckout, createPaymentInfo });

    const { apiRouter } = routerFactory({
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
      createOrUpdateShoppingCartRoute,
      requestAuthenticationMiddleware,
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
    });

    cronJobConfig.job.start();
    apiRouter({ app });
  } catch (applicationError) {
    console.log(applicationError);
    throw new Error('Erro na aplicação, terminando!');
  }
};

application();
