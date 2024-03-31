const autogenswagger = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Nursery system',
    description: 'Description'
  },
  host: 'localhost:8080'
};

const outputFile = './swagger-output.json';
const routes = ['./Routes/loginRoute.js','./Routes/teacherRoute.js','./Routes/childRoute.js','./Routes/classRoute.js','./Routes/resetpasswordRoute.js'];


autogenswagger(outputFile, routes, doc);