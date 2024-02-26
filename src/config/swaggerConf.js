const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        title: 'travel support app',
        version: '1.0.0',
        description: 'API .....',
    },
    basePath: '/',
};
const options = {
    swaggerDefinition,
    apis: ['./routers/*.route.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerSpec,
    swaggerDefinition,
};
