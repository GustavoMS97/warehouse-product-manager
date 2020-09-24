/**
 * @param {{ mongoose: import('mongoose') }} param
 */
exports.WarehouseFactory = ({ mongoose } = {}) => {
  const WarehouseSchema = new mongoose.Schema({
    name: { type: String, uppercase: true, required: true },
    isThirdParty: { type: Boolean, required: true, default: false },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  const Warehouse = mongoose.model('Warehouse', WarehouseSchema);

  return { Warehouse };
};
