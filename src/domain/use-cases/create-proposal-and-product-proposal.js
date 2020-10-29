const joi = require('joi');

exports.createProposalAndProposalProductFactory = ({ createProposal, createProposalProduct } = {}) => {
  return {
    createProposalAndProposalProduct: async ({ params } = {}) => {
      try {
        const {
          name,
          code,
          quantity,
          price,
          unitOfMeasurement,
          category,
          provider,
          minimumInStock,
          paymentDate,
          deliveryDate,
          accepted,
          quote,
        } = joi.attempt(
          params,
          joi.object().keys({
            name: joi.string().required(),
            code: joi.string().required(),
            quantity: joi.string().required(),
            price: joi.string().required(),
            unitOfMeasurement: joi.string().required(),
            category: joi.string().required(),
            provider: joi.string().required(),
            minimumInStock: joi.string().required(),
            paymentDate: joi.string().required(),
            deliveryDate: joi.string().required(),
            accepted: joi.string().required(),
            quote: joi.string().required(),
          }),
        );
        const { proposal } = await createProposal({ provider, paymentDate, deliveryDate, accepted, quote });
        const { proposalProduct } = await createProposalProduct({
          proposal,
          name,
          code,
          quantity,
          price,
          unitOfMeasurement,
          category,
          provider,
          minimumInStock,
        });
        return { success: proposalProduct };
      } catch (createProposalAndProposalProductError) {
        console.log(createProposalAndProposalProductError);
        throw new Error('Não foi possível criar uma proposta!');
      }
    },
  };
};
