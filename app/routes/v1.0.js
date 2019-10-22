const _ = require('lodash');
const router = require('express').Router();

const resError = require('../middleware/res-error');
const resSuccess = require('../middleware/res-success');
const paginate = require('../middleware/paginate');
const modelMagic = require('../middleware/model-magic');

const genreCtrl = require('../controllers/genres.controller')();
const movieCtrl = require('../controllers/movies.controller')();

router.use(resError);
router.use(resSuccess);

// ####### Health Check #########
router.get('/', (req, res) => res.status(200).send('Homitag CRM API.'));
router.get('/health-check', (req, res) => res.status(200).send('Beat.'));

// ####### Genres route #######
router.all('/genres/:id*', modelMagic('genre'));
router.get('/genres', paginate, genreCtrl.list.bind(genreCtrl));
router.post('/genres', genreCtrl.create.bind(genreCtrl));
router.get('/genres/:id', genreCtrl.show.bind(genreCtrl));
router.put('/genres/:id', genreCtrl.update.bind(genreCtrl));
router.delete('/genres/:id', genreCtrl.destroy.bind(genreCtrl));

// ####### Movies route #######
router.all('/movies/:id*', modelMagic('movie'));
router.get('/movies', paginate, movieCtrl.list.bind(movieCtrl));
router.post('/movies', movieCtrl.create.bind(movieCtrl));
router.get('/movies/:id', movieCtrl.show.bind(movieCtrl));
router.put('/movies/:id', movieCtrl.update.bind(movieCtrl));
router.delete('/movies/:id', movieCtrl.destroy.bind(movieCtrl));

module.exports = router;
