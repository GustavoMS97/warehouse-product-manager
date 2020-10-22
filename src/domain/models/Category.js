/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.CategoryFactory = ({ mongoose } = {}) => {
  const CategorySchema = new mongoose.Schema({
    name: { type: String, uppercase: true, required: true, index: { unique: true } },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }).index({ name: 1 });
  const Category = mongoose.model('Category', CategorySchema);

  return { Category };
};
