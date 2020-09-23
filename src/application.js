const { loadEnvironment } = require('./infra/config/environment');

const { apiFactory } = require('./infra/api/api');

const { connectToMongoose } = require('./infra/db/mongoose');
const { BranchFactory } = require('./domain/models/Branch');

const { createBranchFactory } = require('./domain/services/create-branch');
const { createBranchRouteFactory } = require('./infra/api/routes/create-branch-route');

const { routerFactory } = require('./infra/api/router');

const application = async () => {
  try {
    const { ENV } = loadEnvironment();

    const { startApi } = apiFactory({ ENV });
    const { app } = await startApi();

    const { mongoose } = await connectToMongoose({ ENV });
    const { Branch } = BranchFactory({ mongoose });

    const { createBranch } = createBranchFactory({ Branch });
    const { createBranchRoute } = createBranchRouteFactory({ createBranch });

    const { apiRouter } = routerFactory({ createBranchRoute });

    apiRouter({ app });
  } catch (applicationError) {
    console.log(applicationError);
    throw new Error('Erro na aplicação, terminando!');
  }
};

application();
