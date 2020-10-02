const joi = require('joi');
const { PRODUCT_MOVEMENT_CSV_HEADERS_ARRAY, PRODUCT_MOVEMENT_TYPES } = require('../../../constants');

exports.moveProductFileRouteFactory = ({
  moveProduct,
  validateCSVHeaders,
  getFileContent,
  getCSVContentInMatrix,
} = {}) => {
  return {
    moveProductFileRoute: async (req, res, next) => {
      try {
        const { content } = getFileContent({ filePath: req.file.path });
        const { isHeadersValid } = validateCSVHeaders({
          expectedHeaders: PRODUCT_MOVEMENT_CSV_HEADERS_ARRAY,
          fileContent: content,
        });
        if (!isHeadersValid) {
          return res.status(400).send({ message: 'Cabeçalhos invalidos' });
        }
        const { fileContentMatrix } = getCSVContentInMatrix({ fileContent: content });
        for (let i = 1; i < fileContentMatrix.length; i++) {
          const fileContentMatrixRow = fileContentMatrix[i];
          const [
            documentObservation,
            documentCode,
            productName,
            productCode,
            productUnitOfMeasurement,
            productProvider,
            productWarehouse,
            productMovementQuantity,
            productMovementPrice,
            productMovementType,
          ] = fileContentMatrixRow;
          const { error: envVarsValidationError } = joi
            .object()
            .keys({
              documentObservation: joi.string().required(),
              documentCode: joi.string().required(),
              productName: joi.string().required(),
              productCode: joi.string().required(),
              productUnitOfMeasurement: joi.string(),
              productProvider: joi.string().required(),
              productWarehouse: joi.string().required(),
              productMovementQuantity: joi
                .string()
                .custom((value, helper) => {
                  if (isNaN(value)) {
                    return helper.message('Must be a string with only numeric');
                  }
                  return true;
                })
                .required(),
              productMovementPrice: joi
                .string()
                .custom((value, helper) => {
                  if (isNaN(value)) {
                    return helper.message('Must be a string with only numeric');
                  }
                  return true;
                })
                .required(),
              productMovementType: joi
                .string()
                .custom((value, helper) => {
                  if (isNaN(value)) {
                    return helper.message('Must be a string with only numeric');
                  }
                  return true;
                })
                .valid(...PRODUCT_MOVEMENT_TYPES.map((i) => `${i.id}`))
                .required(),
            })
            .required()
            .validate({
              documentObservation,
              documentCode,
              productName,
              productCode,
              productUnitOfMeasurement,
              productProvider,
              productWarehouse,
              productMovementQuantity,
              productMovementPrice,
              productMovementType,
            });
          if (envVarsValidationError) {
            return res
              .status(400)
              .send({ response: `Movimentação ${i} não foi processada, finalizando o processamento aqui` });
          }
          // Para cada row, fazer o move product
          const { success } = await moveProduct({
            params: {
              documentObservation,
              documentCode,
              productName,
              productCode,
              productUnitOfMeasurement,
              productProvider,
              productWarehouse,
              productMovementQuantity: parseInt(productMovementQuantity),
              productMovementPrice: parseInt(productMovementPrice),
              productMovementType: parseInt(productMovementType),
            },
          });
          if (!success) {
            return res
              .status(400)
              .send({ response: `Movimentação ${i} não foi processada, finalizando o processamento aqui` });
          }
        }
        return res.status(200).send({ response: 'Movimentações foram realizadas com sucesso' });
      } catch (moveProductFileRouteError) {
        console.log(moveProductFileRouteError);
        next(moveProductFileRouteError);
      }
    },
  };
};
