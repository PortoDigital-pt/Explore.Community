const mongoose = require('mongoose');

const { Schema } = mongoose;

const FavoriteSchema = new Schema(
  {
    _id: { type: Schema.ObjectId, auto: true },
    favouriteId: { type: String, required: true },
    userId: { type: String, required: true },
    gid: { type: String, required: false },
    address: { type: String, required: false },
    name: { type: String, required: false },
    type: { type: String, required: false },
    layer: { type: String, required: false },
    lat: { type: Number, required: false },
    lon: { type: Number, required: false },
    defaultName: { type: String, required: false },
    lastUpdated: { type: Number, required: true }
  },
  {
    timestamps: { createdAt: true },
    strict: false,
    optimisticConcurrency: true
  }
);

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = { Favorite };
