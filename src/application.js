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
const { findProductByCodeFactory } = require('./domain/services/find-product-by-code');
const { updateProductProvidersByIdFactory } = require('./domain/services/update-product-providers-by-id');

const { processMovementsFactory } = require('./domain/use-cases/process-movements');
const { moveProductFactory } = require('./domain/use-cases/move-product');

const { createBranchRouteFactory } = require('./infra/api/routes/create-branch-route');
const { createLocationRouteFactory } = require('./infra/api/routes/create-location-route');
const { createWarehouseRouteFactory } = require('./infra/api/routes/create-warehouse-route');
const { moveProductRouteFactory } = require('./infra/api/routes/move-product-route');

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
    const { findProductByCode } = findProductByCodeFactory({ Product });
    const { updateProductProvidersById } = updateProductProvidersByIdFactory({ Product });

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

    const { apiRouter } = routerFactory({
      createBranchRoute,
      createLocationRoute,
      createWarehouseRoute,
      moveProductRoute,
    });

    apiRouter({ app });
  } catch (applicationError) {
    console.log(applicationError);
    throw new Error('Erro na aplicação, terminando!');
  }
};

application();
