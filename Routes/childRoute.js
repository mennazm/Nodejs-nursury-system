const express = require("express");
const router = express.Router();
const validationResult = require("../Middleware/validations/validationResult");
const controller = require("../Controller/childController");
const childValidation = require("../Middleware/validations/childValidation");
const auth = require('../Middleware/auth');
router
    .route("/children")
    .all(auth, auth.checkAdmin)
    .get(controller.getAllchildren)
    .post(childValidation.post, validationResult, controller.addchild);

router
    .route("/children/:id")
    .all(auth, auth.checkAdmin)
    .get(controller.getChildById)
    .put(childValidation.update, validationResult, controller.updatechild)
    .delete(childValidation.update, validationResult,controller.deletechild);


module.exports = router;
