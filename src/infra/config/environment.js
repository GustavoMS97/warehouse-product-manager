const env = require('dotenv');
const joi = require('joi');
const path = require('path');

const ENV_MODE = Object.freeze({
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
});

const getTempFolder = () => path.join(process.cwd(), 'tmp');

exports.loadEnvironment = () => {
  let { parsed: rawEnvVars, error: envVarsLoadError } = env.config();
  if (envVarsLoadError) {
    console.log(envVarsLoadError);
    console.log('Não foi possível carregar as variaveis de ambiente pelo arquivo, carregando do sistema!');
    rawEnvVars = process.env;
  }

  const { value: envVars, error: envVarsValidationError } = joi
    .object()
    .keys({
      NODE_ENV: joi
        .string()
        .default(ENV_MODE.DEVELOPMENT)
        .valid(...Object.values(ENV_MODE)),
      PORT: joi.number().port().required(),
      MONGO_DB_URL: joi.string().required(),
    })
    .required()
    .options({ stripUnknown: true })
    .validate(rawEnvVars);
  if (envVarsValidationError) {
    console.log('Não foi possivel carregar as variaveis de ambiente, finalizando aplicação.');
    throw envVarsValidationError;
  }

  envVars.TEMP_FOLDER = getTempFolder();

  return { ENV: envVars };
};
