const mongoose = require("mongoose");
require('./../Model/classModel');
require("./../Model/teacherModel");
require("./../Model/childModel");

const childSchema = mongoose.model("childern");
const teacherSchema = mongoose.model("teachers");
const classSchema = mongoose.model("classes");
exports.getAllClasses = (request, response, next) => {
    classSchema.find()
        .then((data) => {
            response.status(200).json(data);
        })
        .catch((error) => next(error));
};

exports.getClassbyid = async (request, response, next) => {
    try {
        const _id = request.params.id;
        const cls = await classSchema.findById(_id);
        if (!cls) {
            throw new Error("Class not found");
        }
        response.status(200).json({ data: cls });
    } catch (error) {
        next(error);
    }
};

exports.addClass=(request,response,next)=>{
    let childerns = Array.from(new Set(request.body.children));
    teacherSchema.findOne({
            _id:request.body.supervisor
        })
    .then(data => {
        if(data==null)
            throw new Error("Teacher not Found");
        else
            return childSchema.find({
                _id:{$in:childerns}
            })
    }).then(data => {
        if(data.length != childerns.length)
            throw Error("Childern not Found");
        else{
            return new classSchema({
                name: request.body.name,
                supervisor: request.body.supervisor,
                children: childerns,
            })
        .save()
    }
    })
    .then((data) => {
    response.status(201).json(data);
    })
    .catch((error) => next(error));
}

exports.updateClass=(request,response,next)=>{
    let childerns = Array.from(new Set(request.body.children));
    teacherSchema.findOne({_id:request.body.supervisor},{_id:1})
    .then(data => {
    if(data==null && request.body.supervisor != undefined){
        throw new Error("Teacher not Found");
    }else{
        return childSchema.find({_id:{$in:childerns}},{_id:1})
    }
    }).then(data => {
    if(data.length != childerns.length){
        throw Error("Childern not Found");
    }else{
        return classSchema
        .updateOne(
        {
            _id: request.body.id,
        },
        {
            $set: {
            name: request.body.name,
            supervisor: request.body.supervisor,
            children: childerns,
            },
        }
        )
    }
    })
    .then((data) => {
    if(data.matchedCount == 0){
        throw new Error("Not Found")
    }else{
        response.status(200).json(data);
    }
    })
    .catch((error) => next(error));
}

exports.deleteClass=(request,response,next)=>{
    classSchema.deleteOne({_id:request.body.id})
    .then(data=>{
    if(data.deletedCount == 0){
        throw new Error("class Not Found")
    }else{
        response.status(200).json(data);
    }
    })
    .catch(error=>next(error))
}
exports.getClassChildrenInfo = async (request, response, next) => {
    try {
        const classId = request.params.id;
        const cls = await classSchema.findById(classId).populate('children');
        if (!cls) {
            throw new Error("Class not found");
        }
        response.status(200).json({ data: cls.children });
    } catch (error) {
        next(error);
    }
};

exports.getClassSupervisorInfo = async (request, response, next) => {
    try {
        const classId = request.params.id;
        const cls = await classSchema.findById(classId).populate('supervisor');
        if (!cls) {
            throw new Error("Class not found");
        }
        response.status(200).json({ data: cls.supervisor });
    } catch (error) {
        next(error);
    }
};
