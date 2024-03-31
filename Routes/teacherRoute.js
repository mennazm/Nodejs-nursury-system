const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const validationResult = require("./../Middleware/validations/validationResult");
const controller = require("./../Controller/teacherController");
const teacherValidation  = require("./../Middleware/validations/teacherValidation");

const auth = require('../Middleware/auth');



const upload = multer({ 
    fileFilter: (request, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error("Please Upload images only"));
        }
    } ,
    storage: multer.diskStorage({
        destination:(request, file, cb) => {
            cb(null, path.join(__dirname,"..","images"));
        },
        filename: (request, file, cb) => {
            let ext = path.extname(file.originalname);
            let fileName = path.basename(file.originalname, ext);
            let finalName =  file.fieldname + '-' + fileName + '-' + Date.now() + ext
            cb(null, finalName);
        }
    }),
});

router
    .get("/teachers/supervisors", controller.getSupervisors);
router
.route("/teachers")
    .all(auth)
    .get(auth.checkAdmin, controller.getAllteachers)
    .post(auth.checkAdminOrTeacher,upload.single('image'), teacherValidation.post, validationResult, controller.addteacher)
    

router
    .route("/teachers/:id")
    .all(auth)
    .get(auth.checkAdmin, controller.getTeacherById)
    .put(auth.checkAdminOrTeacher,upload.single('image'),teacherValidation.update, validationResult, controller.updateteacher)
    .delete(auth.checkAdmin,teacherValidation.delete,validationResult,controller.deleteteacher);
   


module.exports = router;
