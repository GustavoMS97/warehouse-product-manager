/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.CheckoutFactory = ({ mongoose } = {}) => {
  const CheckoutSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    productMovements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductMovement', required: true }],
    paymentDate: { type: Date, default: Date.now },
    paymentInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentInfo',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  const Checkout = mongoose.model('Checkout', CheckoutSchema);

  return { Checkout };
};
