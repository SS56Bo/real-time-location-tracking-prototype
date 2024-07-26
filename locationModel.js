const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    common_id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (v) {
          return v.length === 2;
        },
        message: (props) => `${props.value} must contain exactly two elements`,
      },
    },
  },
  {
    collection: 'locationTest', // Specify the correct collection name
  }
);

locationSchema.index({ coordinates: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
