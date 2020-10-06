/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.ProposalFactory = ({ mongoose } = {}) => {
  const ProposalSchema = new mongoose.Schema({
    provider: { type: String, required: true },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
      default: Date.now,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    quote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quote',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  const Proposal = mongoose.model('Proposal', ProposalSchema);

  return { Proposal };
};
