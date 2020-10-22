exports.processAbandonmentShoppingCartFactory = ({ ProductMovement, Product } = {}) => {
  return {
    processAbandonmentShoppingCart: async () => {
      try {
        console.log('----- Job Iniciado  -----');
        console.log('Verificando carrinhos não finalizados');
        console.log('Executando para carrinhos finalizados');
        console.log('----- Job Encerrado -----');
        // ProductMovement.find();
        // Product.find();
        return { status: true };
      } catch (processAbandonmentShoppingCartError) {
        console.log(processAbandonmentShoppingCartError);
        throw new Error('Não foi possivel executar o processo de abandono do carrinho');
      }
    },
  };
};
