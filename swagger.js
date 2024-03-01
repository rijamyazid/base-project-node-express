require("dotenv").config();

/* Swagger configuration */
const options = {
    openapi: 'OpenAPI 3',   // Enable/Disable OpenAPI. By default is null
    language: 'en-US',      // Change response language. By default is 'en-US'
    disableLogs: false,     // Enable/Disable logs. By default is false
    autoHeaders: true,     // Enable/Disable automatic headers capture. By default is true
    autoQuery: true,       // Enable/Disable automatic query capture. By default is true
    autoBody: true         // Enable/Disable automatic body capture. By default is true
}

const swaggerAutogen = require("swagger-autogen")();
const { PORT, NODE_ENV } = process.env;

// const serverUrl =
//     NODE_ENV === "stagging"
//         ? "http://188.166.239.112:5439"
//         : `http://localhost:${PORT}`;

const doc = {
    info: {
        version: '1.0.0',   // by default: '1.0.0'
        title: "Base Express.js Project REST API",  // by default: 'REST API'
        description: "API Documentation",   // by default: ''
    },
    host: "",   // by default: 'localhost:3000'
    basePath: '/',  // by default: '/'
    schemes: ['http'],  // by default: ['http']
    consumes: ['application/json'],  // by default: ['application/json']
    produces: ['application/json'],  // by default: ['application/json']
    tags: [        // by default: empty Array
        {
            name: 'Base CRUD',         // Tag name
            description: 'Base related APIs',  // Tag description
        }
    ],
    securityDefinitions: {},  // by default: empty object
    definitions: {}           // by default: empty object
    // servers: [
    //     {
    //         url: serverUrl,
    //         description: NODE_ENV === "stagging" ? "Live Server" : "Local Server",
    //     },
    // ],
};

const outputFile = './swagger-output.json';
const routes = ['./app.js', './controllers/*.js'];

swaggerAutogen(outputFile, routes, doc);