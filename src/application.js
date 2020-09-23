const { loadEnvironment } = require('./infra/config/environment');

const { apiFactory } = require('./infra/api/api');

const { connectToMongoose } = require('./infra/db/mongoose');
const { BranchFactory } = require('./domain/models/Branch');
const { LocationFactory } = require('./domain/models/Location');

const { createBranchFactory } = require('./domain/services/create-branch');
const { createLocationFactory } = require('./domain/services/create-location');
const { createBranchRouteFactory } = require('./infra/api/routes/create-branch-route');
const { createLocationRouteFactory } = require('./infra/api/routes/create-location-route');

const { routerFactory } = require('./infra/api/router');

const application = async () => {
  try {
    const { ENV } = loadEnvironment();

    const { startApi } = apiFactory({ ENV });
    const { app } = await startApi();

    const { mongoose } = await connectToMongoose({ ENV });
    const { Branch } = BranchFactory({ mongoose });
    const { Location } = LocationFactory({ mongoose });

    const { createBranch } = createBranchFactory({ Branch });
    const { createLocation } = createLocationFactory({ Location });
    const { createBranchRoute } = createBranchRouteFactory({ createBranch });
    const { createLocationRoute } = createLocationRouteFactory({ createLocation });

    const { apiRouter } = routerFactory({ createBranchRoute, createLocationRoute });

    apiRouter({ app });
  } catch (applicationError) {
    console.log(applicationError);
    throw new Error('Erro na aplicação, terminando!');
  }
};

application();
