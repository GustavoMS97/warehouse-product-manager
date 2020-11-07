exports.createPaymentInfoFactory = ({ PaymentInfo } = {}) => {
  return {
    createPaymentInfo: async ({ owner, cardHash, bankslipNumber } = {}) => {
      try {
        const paymentInfo = await PaymentInfo.create({
          owner,
          cardHash,
          bankslipNumber,
        });
        return { paymentInfo };
      } catch (createPaymentInfoError) {
        console.log(createPaymentInfoError);
        throw new Error('Não foi possivel criar as informações do pagamento');
      }
    },
  };
};
