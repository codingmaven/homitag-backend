const chai = require('chai');
const supertest = require('supertest-as-promised');
const _ = require('lodash');
const mongoose = require('mongoose');
const { Genre } = require('../../app/models');
const app = require('../../app/app');
const expect = chai.expect;
const request = supertest(app);

describe('Genre Controller', function () {
  let genre;

  before(async () => {
    genre = await Genre.create({
      name: 'rock',
      description: 'description'
    });
  });

  after(async () => {
    await genre.remove();
  });

  describe('get /genres', function () {
    it('Should return list of genres with default pagination', async () => {
      const res = await request
        .get('/api/genres')
        .set('Authorization', 'test')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(res.body).to.be.an('object');
      expect(res.body.data).to.be.an('object');
      expect(res.body).to.have.property('success', true);
      expect(res.body.data.docs).to.be.an('array');
      expect(res.body.data.docs.length).to.be.equal(1);

      // Default Pagination
      expect(res.body.data.total).to.be.equal(1);
      expect(res.body.data.limit).to.be.equal(30);
      expect(res.body.data.offset).to.be.equal(0);
    });

    it('Should return list of genres with custom pagination', async () => {
      const res = await request
        .get('/api/genres?offset=20&limit=20')
        .set('Authorization', 'test')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(res.body).to.be.an('object');
      expect(res.body.data).to.be.an('object');
      expect(res.body).to.have.property('success', true);
      expect(res.body.data.docs).to.be.an('array');
      expect(res.body.data.docs.length).to.be.equal(0);

      // Custom Pagination
      expect(res.body.data.total).to.be.equal(1);
      expect(res.body.data.limit).to.be.equal(20);
      expect(res.body.data.offset).to.be.equal(20);
    });
  });

  describe('get /genres/:id', function () {
    it('Should return event with valid id', async () => {
      const res = await request
        .get(`/api/genres/${genre._id}`)
        .set('Authorization', 'test')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(res.body).to.be.an('object');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data._id).to.be.equal(genre._id.toString());
    });

    it('Should return 404 for invalid id', async () => {
      await request
        .get(`/api/genres/${mongoose.Types.ObjectId()}`)
        .set('Authorization', 'test')
        .expect(404)
        .expect('Content-Type', /json/);
    });

  });

  describe('post /genres', function () {
    it('Should create event with valid data', async () => {
      const res = await request
        .post(`/api/genres`)
        .send({
          name: 'new title'
        })
        .expect(200)
        .expect('Content-Type', /json/);

      expect(res.body).to.be.an('object');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.name).to.be.equal('new title');
    });
  });

  describe('put /genres/:id', function () {
    it('Should update event with valid id', async () => {
      const res = await request
        .put(`/api/genres/${genre._id}`)
        .send({
          name: 'updated name',
        })
        .expect(200)
        .expect('Content-Type', /json/);

      expect(res.body).to.be.an('object');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data.name).to.be.equal('updated name');
    });

    it('Should return 404 for invalid id', async () => {
      await request
        .put(`/api/genres/${mongoose.Types.ObjectId()}`)
        .send({
          name: 'updated name',
        })
        .expect(404)
        .expect('Content-Type', /json/);
    });
  });

  describe('delete /genres/:id', function () {
    it('Should delete event with valid id', async () => {
      const res = await request
        .delete(`/api/genres/${genre._id}`)
        .set('Authorization', 'test')
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('Should return 404 for invalid id', async () => {
      await request
        .delete(`/api/genres/${mongoose.Types.ObjectId()}`)
        .set('Authorization', 'test')
        .expect(404)
        .expect('Content-Type', /json/);
    });
  });
});
