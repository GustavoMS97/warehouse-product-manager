exports.findProductMovementFileByProductRouteFactory = ({
  findProductMovementByProduct,
  generateFileFromString,
} = {}) => {
  return {
    findProductMovementFileByProductRoute: async (req, res, next) => {
      try {
        const { productId } = req.params;
        const { productMovement } = await findProductMovementByProduct({ productId });
        const productMovementString = JSON.stringify(productMovement);
        const { filePath, fileName } = generateFileFromString({ content: productMovementString, ext: 'json' });
        return res.download(filePath, fileName);
      } catch (findProductMovementFileByProductRouteError) {
        console.log(findProductMovementFileByProductRouteError);
        next(findProductMovementFileByProductRouteError);
      }
    },
  };
};
