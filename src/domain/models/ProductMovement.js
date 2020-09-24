const { PRODUCT_MOVEMENT_TYPES } = require('../../constants');

/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.ProductMovementFactory = ({ mongoose } = {}) => {
  const ProductMovementSchema = new mongoose.Schema({
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    type: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return PRODUCT_MOVEMENT_TYPES.map((a) => a.id).includes(v);
        },
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }).index({ document: 1 });
  const ProductMovement = mongoose.model('ProductMovement', ProductMovementSchema);

  return { ProductMovement };
};
