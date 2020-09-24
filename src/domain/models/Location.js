/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.LocationFactory = ({ mongoose } = {}) => {
  const LocationSchema = new mongoose.Schema({
    name: { type: String, uppercase: true, required: true },
    address: { type: String, uppercase: true, required: true },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  const Location = mongoose.model('Location', LocationSchema);

  return { Location };
};
