const { body, param, query } = require("express-validator");

exports.post = [
   body("fullName").isString().withMessage("Full Name must be string"),
   body("email").isEmail().withMessage("Invalid Email Format"),
   //body("image").isString().withMessage("image Invalid Must be String"),
   body("password").isLength({min: 8}).withMessage("Password Must be Min length 8")
];

exports.update = [
    body("id").isMongoId().withMessage("Id Shoud be valid mongoId"),
    body("fullName").optional().isString().withMessage("Full Name must be string"),
    body("email").optional().isEmail().withMessage("Invalid Email Format"),
   // body("image").optional().isString().withMessage("Invalid image Must be String"),
    body("password").optional().isLength({min: 8}).withMessage("Password Must be Min length 8")
];


exports.delete = [
    body("id").isMongoId().withMessage("Id Shoud be a vaild mongoid "),
]