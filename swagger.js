const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/api.js'];
const port = process.env.PORT || 3000;
const url = process.env.URL || 'localhost';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Book Tracking API',
    description: 'A RESTful API for the book you have read.',
  },
  basePath: '/api',
  schemes: ['https', 'http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
