exports.createPaymentInfoFactory = ({ PaymentInfo } = {}) => {
  return {
    createPaymentInfo: async ({ owner, cardhash, bankslipNumber } = {}) => {
      try {
        const paymentInfo = await PaymentInfo.create({
          owner,
          cardhash,
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
