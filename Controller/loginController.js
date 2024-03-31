require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const teacherSchema = mongoose.model("teachers");

exports.login = (request, response, next) => {
teacherSchema.findOne({email:request.body.email})
    .then(teachers=>{
        if(teachers == null)
            throw new Error("Not Found");
       
        else {
            let role = "teacher";
            if(teachers._id == "6605f4886697133f901f4ba3")
              role="admin"; 
              console.log(teachers._id)
              console.log(role)
            let token = jwt.sign(
                {_id:teachers._id, role:role}, 
                process.env.SECRET_KEY,
                {expiresIn: "24h"}

            );
            response.status(200).json({token:token,"message":"Authorized"});
        }
    })
    .catch(error=>{
        error.status=401;
        next(error);
    });
}

// exports.login = (request, response, next) => {
//     teacherSchema.findOne({ email: request.body.email })
//         .then(teachers => {
//             if (!teachers) {
//                 throw new Error("Teacher not found");
//             }
//        else{
//             let role = "teacher"; 
//             if (teachers._id === "6605f4886697133f901f4ba3")
//             { 
//                       role = "admin";
                      
//             }          
//               console.log(teachers._id)
//               console.log(role)
//             let token = jwt.sign(
//                 {_id: teachers._id, role: role },process.env.SECRET_KEY);
//                 { "24h" }
//                response.status(200).json({ token: token, message: "Authorized" });
//             }
//         })
//         .catch(error => {
//             next(error);
//         });
// };
