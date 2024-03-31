require('dotenv').config();
const express=require("express");
const cors=require("cors");


const teacherRoute=require("./Routes/teacherRoute");
const childRoute=require("./Routes/childRoute");
const classRoute=require("./Routes/classRoute");
const loginRoute=require("./Routes/loginRoute.js");
const resetpasswordRoute = require("./Routes/resetpasswordRoute.js");
const authmw = require("./Middleware/auth.js");
const mongoose=require("mongoose");


const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require("./swaggerdoc.json");



const server=express();  
let port=process.env.PORT||process.env.defaultPort_Number; 
mongoose.set('strictQuery',true);
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log( "connected to MongoDB" );
    server.listen(port,()=>{
        console.log("server is listenng on port",port);
    });
})

.catch((error)=>{
    console.log("Error in connecting to the database ", error)
})

/////////////***** */
server.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));
server.use(cors());  
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});

server.use(express.json());
server.use(express.urlencoded({extended:true}));


//Routes  

server.use(loginRoute);
server.use(authmw);
server.use(resetpasswordRoute);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);




//-------Not found MW
server.use((request,response)=>{

    response.status(404).json({message:"Page Not Found"});

});
//-------Error MW
server.use((error,request,response,next)=>{
    let status=error.status||500;
    response.status(status).json({message:error+""});
})






