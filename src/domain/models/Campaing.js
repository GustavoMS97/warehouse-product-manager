/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.CampaingFactory = ({ mongoose } = {}) => {
  const CampaingSchema = new mongoose.Schema({
    name: { type: String, uppercase: true, required: true, index: { unique: true } },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    isActive: {
      type: Boolean,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }).index({ name: 1 });
  const Campaing = mongoose.model('Campaing', CampaingSchema);

  return { Campaing };
};
