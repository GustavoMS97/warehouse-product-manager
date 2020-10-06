/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.QuoteFactory = ({ mongoose } = {}) => {
  const QuoteSchema = new mongoose.Schema({
    description: { type: String, required: true },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  const Quote = mongoose.model('Quote', QuoteSchema);

  return { Quote };
};
