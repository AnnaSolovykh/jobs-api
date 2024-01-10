const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Meals API for Solanna',
        description: 'Daily Meals Options',
    },
    host: 'meals-api-solanna.onrender.com', 
    schemes: ['https'],
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Enter your bearer token in the format **Bearer &lt;token>**',
        }
    }
};

const outputFile = './swagger-output.json'; 
const endpointsFiles = ['./routes/auth.js', './routes/meals.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);
