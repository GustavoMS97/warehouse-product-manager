exports.findPaymentInfoByOwnerFactory = ({ PaymentInfo } = {}) => {
  return {
    findPaymentInfoByOwner: async ({ owner } = {}) => {
      try {
        const paymentInfo = await PaymentInfo.find({ owner: owner });
        return { paymentInfo };
      } catch (findPaymentInfoByOwnerError) {
        console.log(findPaymentInfoByOwnerError);
        throw new Error('Não foi possivel obter o pagamento do usuario!');
      }
    },
  };
};
