const express=require("express");
const loginController=require("../Controller/loginController");
const loginValidation = require("../Middleware/validations/loginvalidation");

const router=express.Router();

router.route("/login")
    .post(loginValidation.post,loginValidation,loginController.login);

module.exports=router;