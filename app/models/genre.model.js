const mongoose = require('mongoose');
const _ = require('lodash');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: String,
  description: String
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
});

GenreSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('genre', GenreSchema);