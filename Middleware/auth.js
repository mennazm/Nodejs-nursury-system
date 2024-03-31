const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    try {
        let token = request.headers.authorization.split(" ")[1];
       
        console.log("Token:", token); // Log the token
        let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded Token:", decodedToken); 
        request.token = decodedToken;
       // request.id = decodedToken.id;
        // request.role = decodedToken.role;
      
        console.log(request.token);

        next();
    } catch(error) {
        console.error("JWT Error:", error);
        error.status = 401;
        error.message = "You are not authorized to access";
        next(error);
    }
};

// auth.js

// Middleware for checking if the user is admin
module.exports.checkAdmin = (request, response, next) => {
    if (request.token.role === "admin") {
        next();
    } else {
        let error = new Error("You don't have admin privileges.");
        error.status = 403;
        next(error);
    }
};

// Middleware for checking if the user is admin or teacher
module.exports.checkAdminOrTeacher = (request, response, next) => {
    if (request.token.role === "admin" || request.token.role === "teacher") {
        next();
    } else {
        let error = new Error("You don't have permission for this action");
        error.status = 403;
        next(error);
    }
};
