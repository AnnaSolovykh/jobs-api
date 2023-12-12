const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Meals API for Solanna',
        description: 'Daily Meals Options',
    },
    host: 'meals-api-solanna.onrender.com', 
    schemes: ['https'],
};

const outputFile = './swagger-output.json'; 
const endpointsFiles = ['./routes/auth.js', './routes/meals.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);
