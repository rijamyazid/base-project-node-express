require('dotenv').config()

/* Swagger configuration */
const options = {
  openapi: null, // Enable/Disable OpenAPI. By default is null
  language: 'en-US', // Change response language. By default is 'en-US'
  disableLogs: false, // Enable/Disable logs. By default is false
  autoHeaders: false, // Enable/Disable automatic headers capture. By default is true
  autoQuery: false, // Enable/Disable automatic query capture. By default is true
  autoBody: false // Enable/Disable automatic body capture. By default is true
}

const swaggerAutogen = require('swagger-autogen')(options)

const doc = {
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: 'Base Express.js Project REST API', // by default: 'REST API'
    description: 'API Documentation' // by default: ''
  },
  host: '', // by default: 'localhost:3000'
  basePath: '/', // by default: '/'
  schemes: ['http'], // by default: ['http']
  consumes: ['application/json'], // by default: ['application/json']
  produces: ['application/json'], // by default: ['application/json']
  tags: [ // by default: empty Array
    {
      name: 'Auth',
      description: 'Authorization related APIs'
    },
    {
      name: 'Users', // Tag name
      description: 'Users related APIs' // Tag description
    }
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'authorization',
      scheme: 'bearer',
      in: 'header'
    }
  }, // by default: empty object
  security: [{ bearerAuth: [] }],
  definitions: {} // by default: empty object
}

const outputFile = './swagger-output.json'
const routes = ['./app.js']

swaggerAutogen(outputFile, routes, doc).then(() => {
  require('./bin/www')
})
