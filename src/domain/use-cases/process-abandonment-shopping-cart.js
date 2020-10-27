exports.processAbandonmentShoppingCartFactory = ({ ENV, ShoppingCart } = {}) => {
  return {
    processAbandonmentShoppingCart: async () => {
      try {
        console.log('----- Job Iniciado  -----');
        console.log('Verificando carrinhos não finalizados');
        var dateSearch = new Date();
        dateSearch.addDays(ENV.TIME_ABANDONMENT);
        await ShoppingCart.updateMany({ isActive: true, created_at: { $gte: dateSearch } }, { isActive: false });
        console.log('----- Job Encerrado -----');
        return { status: true };
      } catch (processAbandonmentShoppingCartError) {
        console.log(processAbandonmentShoppingCartError);
        throw new Error('Não foi possivel executar o processo de abandono do carrinho');
      }
    },
  };
};
