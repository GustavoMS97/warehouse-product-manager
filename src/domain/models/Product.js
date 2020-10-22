/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.ProductFactory = ({ mongoose } = {}) => {
  const ProductSchema = new mongoose.Schema({
    name: { type: String, uppercase: true, required: true },
    code: { type: String, uppercase: true, required: true },
    calculatedPrice: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    unitOfMeasurement: { type: String, uppercase: true },
    providers: [{ type: String, required: true }],
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    minimumInStock: { type: Number, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }).index({ code: 1, warehouse: 1 }, { unique: true });
  const Product = mongoose.model('Product', ProductSchema);

  return { Product };
};
