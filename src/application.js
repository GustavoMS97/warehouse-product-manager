const { loadEnvironment } = require('./infra/config/environment');

const application = async () => {
  try {
    const { ENV } = loadEnvironment();
  } catch (applicationError) {
    console.log(applicationError);
    throw new Error('Erro na aplicação, terminando!');
  }
};

application();
