'use strict';

const _ = require('lodash');
const Controller = require('./abstract.controller');

class MoviesController extends Controller {
}

module.exports = () => new MoviesController('movie');
