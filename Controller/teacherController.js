const mongoose =require("mongoose");
require("./../Model/teacherModel");
const teacherSchema = mongoose.model("teachers");
const bcrypt = require("bcrypt");
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);
const fs = require('fs').promises;


exports.getAllteachers = (request, response) => {
    teacherSchema.find({}).then((data)=>{
        response.status(200).json({data});    
    })
    .catch((error)=>{ next(error);  })
    
}
exports.addteacher = (request, response, next) => {
        new teacherSchema({
            _id: new mongoose.Types.ObjectId(),
            fullName: request.body.fullName,
            email: request.body.email,
            image: request.file ? request.file.path : null, 
            password: bcrypt.hashSync(request.body.password, salt),
            isSupervisor: request.body.isSupervisor ? true : false,
        }).save()
        .then(data => {
            response.status(201).json({ data: "new record added" });
        })
        .catch(error => next(error));
    
}; 
exports.updateteacher=(request,response,next)=>{
    teacherSchema.updateOne({
        _id:request.body.id,
       
    },{
        $set:{
            fullName:request.body.fullName,
            email:request.body.email,
            image: request.file ? request.file.path : null,
            password: request.body.password
        }
    }).then(data=>{
        if(data.matchedCount==0)
            next(new Error("Teacher not Found"));
        else
            response.status(200).json({data});
    })
    .catch(error=>next(error));
}

exports.deleteteacher = (request, response,next) => {
    const teacherId = request.body.id; 
    teacherSchema.deleteOne({
        _id: teacherId
    }).then(data => {
        response.status(200).json({ data: `Deleted teacher with ID ${teacherId}` });
    }).catch(error => next(error));
};

exports.getTeacherById = (request, response, next) => {
    const _id = request.params.id;
    teacherSchema.findById(_id)
        .then(teacher => {
            if (!teacher) {
                response.status(404).json({ error: "Teacher not found" });
            } else {
                response.status(200).json({ data: teacher });
            }
        })
        .catch(error => next(error));
};

exports.getSupervisors = (request, response, next) => {
    teacherSchema.find({ isSupervisor: true })
        .then(supervisors => {
            response.status(200).json({ data: supervisors });
        })
        .catch(error => next(error));
};