/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.LocationFactory = ({ mongoose } = {}) => {
  const LocationSchema = new mongoose.Schema({
    name: { type: String, uppercase: true, required: true },
    location: { type: String, uppercase: true, required: true },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }).index({ name: 1 });
  const Location = mongoose.model('Location', LocationSchema);

  return { Location };
};
