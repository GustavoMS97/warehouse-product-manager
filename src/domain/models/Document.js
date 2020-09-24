/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.DocumentFactory = ({ mongoose } = {}) => {
  const DocumentSchema = new mongoose.Schema({
    code: { type: String, uppercase: true, required: true, index: { unique: true } },
    observation: { type: String, uppercase: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }).index({ code: 1 });
  const Document = mongoose.model('Document', DocumentSchema);

  return { Document };
};
