const mongoose = require('mongoose');
const _ = require('lodash');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: String,
  description: String,
  releaseDate: Date,
  duration: Number,
  rating: Number,
  genre: {
    type:  Schema.Types.ObjectId,
    reference: 'genre',
    index: true
  }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
});

MovieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('movie', MovieSchema);