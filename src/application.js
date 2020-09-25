const { loadEnvironment } = require('./infra/config/environment');

const { apiFactory } = require('./infra/api/api');

const { connectToMongoose } = require('./infra/db/mongoose');
const { BranchFactory } = require('./domain/models/Branch');
const { LocationFactory } = require('./domain/models/Location');
const { WarehouseFactory } = require('./domain/models/Warehouse');
const { ProductFactory } = require('./domain/models/Product');
const { DocumentFactory } = require('./domain/models/Document');
const { ProductMovementFactory } = require('./domain/models/ProductMovement');

const { createBranchFactory } = require('./domain/services/create-branch');
const { createLocationFactory } = require('./domain/services/create-location');
const { createWarehouseFactory } = require('./domain/services/create-warehouse');
const { createProductFactory } = require('./domain/services/create-product');
const { createDocumentFactory } = require('./domain/services/create-document');
const { createProductMovementFactory } = require('./domain/services/create-product-movement');
const { updateProductProvidersByIdFactory } = require('./domain/services/update-product-providers-by-id');
const { findProductByCodeFactory } = require('./domain/services/find-product-by-code');
const { findBranchFactory } = require('./domain/services/find-branch');
const { findLocationByBranchFactory } = require('./domain/services/find-location-by-branch');
const { findWarehouseByLocationFactory } = require('./domain/services/find-warehouse-by-location');
const { findProductMovementByProductFactory } = require('./domain/services/find.product-movement-by-warehouse');
const { findProductByWareHouseFactory } = require('./domain/services/find-product-by-warehouse');

const { processMovementsFactory } = require('./domain/use-cases/process-movements');
const { moveProductFactory } = require('./domain/use-cases/move-product');

const { createBranchRouteFactory } = require('./infra/api/routes/create-branch-route');
const { createLocationRouteFactory } = require('./infra/api/routes/create-location-route');
const { createWarehouseRouteFactory } = require('./infra/api/routes/create-warehouse-route');
const { moveProductRouteFactory } = require('./infra/api/routes/move-product-route');
const { findBranchRouteFactory } = require('./infra/api/routes/find-branch-route');
const { findLocationByBranchRouteFactory } = require('./infra/api/routes/find-location-by-branch-route');
const { findWareHouseByLocationRouteFactory } = require('./infra/api/routes/find-warehouse-by-location-route');
const {
  findProductMovementByProductRouteFactory,
} = require('./infra/api/routes/find-product-movement-by-warehouse-route');
const { findProductByWareHouseRouteFactory } = require('./infra/api/routes/find-product-by-warehouse-route');

const { routerFactory } = require('./infra/api/router');

const application = async () => {
  try {
    const { ENV } = loadEnvironment();

    const { startApi } = apiFactory({ ENV });
    const { app } = await startApi();

    const { mongoose } = await connectToMongoose({ ENV });
    const { Branch } = BranchFactory({ mongoose });
    const { Location } = LocationFactory({ mongoose });
    const { Warehouse } = WarehouseFactory({ mongoose });
    const { Product } = ProductFactory({ mongoose });
    const { Document } = DocumentFactory({ mongoose });
    const { ProductMovement } = ProductMovementFactory({ mongoose });

    const { createBranch } = createBranchFactory({ Branch });
    const { createLocation } = createLocationFactory({ Location });
    const { createWarehouse } = createWarehouseFactory({ Warehouse });
    const { createProduct } = createProductFactory({ Product });
    const { createDocument } = createDocumentFactory({ Document });
    const { createProductMovement } = createProductMovementFactory({ ProductMovement, Product });
    const { updateProductProvidersById } = updateProductProvidersByIdFactory({ Product });
    const { findProductByCode } = findProductByCodeFactory({ Product });
    const { findBranch } = findBranchFactory({ Branch });
    const { findLocationByBranch } = findLocationByBranchFactory({ Location });
    const { findWareHouseByLocation } = findWarehouseByLocationFactory({ Warehouse });
    const { findProductMovementByProduct } = findProductMovementByProductFactory({ ProductMovement });
    const { findProductByWareHouse } = findProductByWareHouseFactory({ Product, Warehouse });

    const { processMovements } = processMovementsFactory({ ProductMovement, Product });
    const { moveProduct } = moveProductFactory({
      createDocument,
      createProduct,
      createProductMovement,
      findProductByCode,
      updateProductProvidersById,
      processMovements,
    });

    const { createBranchRoute } = createBranchRouteFactory({ createBranch });
    const { createLocationRoute } = createLocationRouteFactory({ createLocation });
    const { createWarehouseRoute } = createWarehouseRouteFactory({ createWarehouse });
    const { moveProductRoute } = moveProductRouteFactory({ moveProduct });
    const { findBranchRoute } = findBranchRouteFactory({ findBranch });
    const { findLocationByBranchRoute } = findLocationByBranchRouteFactory({ findLocationByBranch });
    const { findWareHouseByLocationRoute } = findWareHouseByLocationRouteFactory({ findWareHouseByLocation });
    const { findProductMovementByProductRoute } = findProductMovementByProductRouteFactory({
      findProductMovementByProduct,
    });
    const { findProductByWareHouseRoute } = findProductByWareHouseRouteFactory({ findProductByWareHouse });

    const { apiRouter } = routerFactory({
      createBranchRoute,
      createLocationRoute,
      createWarehouseRoute,
      moveProductRoute,
      findBranchRoute,
      findLocationByBranchRoute,
      findWareHouseByLocationRoute,
      findProductMovementByProductRoute,
      findProductByWareHouseRoute,
    });

    apiRouter({ app });
  } catch (applicationError) {
    console.log(applicationError);
    throw new Error('Erro na aplicação, terminando!');
  }
};

application();
