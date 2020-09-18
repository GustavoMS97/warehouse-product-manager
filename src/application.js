const { loadEnvironment } = require('./infra/config/environment');

const { apiFactory } = require('./infra/api/api');
const { connectToMongoose } = require('./infra/db/mongoose');

const { routerFactory } = require('./infra/api/router');

const application = async () => {
  try {
    const { ENV } = loadEnvironment();

    const { startApi } = apiFactory({ ENV });
    const { mongoose } = await connectToMongoose({ ENV });

    const { app } = await startApi();
    const { apiRouter } = routerFactory({});

    apiRouter({ app });
  } catch (applicationError) {
    console.log(applicationError);
    throw new Error('Erro na aplicação, terminando!');
  }
};

application();
