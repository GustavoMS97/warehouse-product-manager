exports.updateProductProvidersByIdFactory = ({ Product } = {}) => {
  return {
    updateProductProvidersById: async ({ productId, provider } = {}) => {
      try {
        const response = await Product.update({ _id: productId }, { $push: { providers: provider } });
        return { response: response.n && response.n > 0 };
      } catch (updateProductProvidersByIdError) {
        console.log(updateProductProvidersByIdError);
        throw new Error('Não foi possível atualizar a lista de fornecedores do produto');
      }
    },
  };
};
