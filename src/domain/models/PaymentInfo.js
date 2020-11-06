/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.PaymentInfoFactory = ({ mongoose } = {}) => {
  const PaymentInfoSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    cardHash: { type: String },
    bankslipNumber: { type: String },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  const PaymentInfo = mongoose.model('PaymentInfo', PaymentInfoSchema);

  return { PaymentInfo };
};
