const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        title: 'Meals API for Solanna',
        description: 'Daily Meals Options',
    },
    host: 'meals-api-solanna.onrender.com', 
    schemes: ['https'],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                description: 'Enter your bearer token in the format **Bearer &lt;token&gt;**'
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
};

const outputFile = './swagger-output.json'; 
const endpointsFiles = ['./routes/auth.js', './routes/meals.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js');
});