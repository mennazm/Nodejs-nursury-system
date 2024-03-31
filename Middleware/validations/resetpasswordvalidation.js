const {body, param} = require("express-validator")


let resetpasswordvalidation =[
 body("newPassword")
 .notEmpty().withMessage('you should provide a valid new password')
 .isLength({min: 8})
 .withMessage("This Password is too weak")
]


module.exports = resetpasswordvalidation;