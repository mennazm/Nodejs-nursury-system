const express = require("express")
const router = express.Router();
const resetPassword = require("../Controller/resetpasswordController")
const validationResult = require("./../Middleware/validations/validationResult");
const resetpasswordvalidation = require("../Middleware/validations/resetpasswordvalidation");



router.post("/resetPassword/:id",resetpasswordvalidation,validationResult, resetPassword);




module.exports = router;