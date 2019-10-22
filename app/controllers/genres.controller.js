'use strict';

const _ = require('lodash');
const Controller = require('./abstract.controller');

class GenresController extends Controller {
}

module.exports = () => new GenresController('genre');
