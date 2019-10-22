# homitag-backend

How to start the api
 - `npm install` to install dependencies
 - `npm start` to start the api
 - `npm test` to run integration tests

Notes:
 - used mongodb as datastore
 - used expressjs as framework and mongoose as ORM
 - used mocha/chai as testing framework and nyc for generating coverage report
 - added swagger yaml for api documentation
 - implement abstract controller with basic CRUD functionality and main controllers are inheriting abstract controller
 - eslint is used for linting
 - included Dockerfile and docker-compose for development and deployments
