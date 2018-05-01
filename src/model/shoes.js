'use strict';

import mongoose from 'mongoose';

const shoesSchema = mongoose.Schema({
  coachName: {
    type: String,
    required: true,
    minLength: 10,
  },
  sport: {
    type: String,
  },
  quantity: {
    type: String,
  },
  sizes: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: () => new Date(),
  },
});

export default mongoose.model('shoes', shoesSchema);
