/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.ShoppingCartFactory = ({ mongoose } = {}) => {
  const ShoppingCartSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    productsQuantity: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    isActive: { type: Boolean, default: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  const ShoppingCart = mongoose.model('ShoppingCart', ShoppingCartSchema);

  return { ShoppingCart };
};
