/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.ProposalProductFactory = ({ mongoose } = {}) => {
  const ProposalProductSchema = new mongoose.Schema({
    proposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proposal',
      required: true,
    },
    unitOfMeasurement: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    minimumInStock: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  const ProposalProduct = mongoose.model('ProposalProduct', ProposalProductSchema);

  return { ProposalProduct };
};
