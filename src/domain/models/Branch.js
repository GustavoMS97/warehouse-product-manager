/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.BranchFactory = ({ mongoose } = {}) => {
  const BranchSchema = new mongoose.Schema({
    name: { type: String, uppercase: true, required: true, index: { unique: true } },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }).index({ name: 1 });
  const Branch = mongoose.model('Branch', BranchSchema);

  return { Branch };
};
