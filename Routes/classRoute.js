const express = require("express");
const router = express.Router();
const controller = require("./../Controller/classController");
const validationResult = require("./../Middleware/validations/validationResult");
const classValidation = require("../Middleware/validations/classValidation");
router
    .route("/class")
    .get(controller.getAllClasses)
    .post(classValidation.post,validationResult,controller.addClass)
    

router.route("/class/:id")
    .get(controller.getClassbyid)
    .put(classValidation.update, validationResult, controller.updateClass)
    .delete(classValidation.delete, validationResult, controller.deleteClass);



router.get("/class/child/:id",controller.getClassChildrenInfo) ;

router.get("/class/teacher/:id",controller.getClassSupervisorInfo);

module.exports = router;
