const mongoose = require("mongoose");
require("./../Model/childModel");

const Childern = mongoose.model("childern");

exports.getAllchildren = (request, response, next) => {
    Childern.find().then((data) => {
            response.status(200).json(data);
        })
        .catch((error) => next(error));
}

exports.addchild = (request, response, next) => {
    const child = new Childern({
        fullName: request.body.fullName,
        age: request.body.age,
        level: request.body.level,
        address: {
            city: request.body.address.city,
            street: request.body.address.street,
            building: request.body.address.building,
        }
    });

    child.save()
        .then(data => {
            response.status(201).json({ message: "new record added" });
        })
        .catch(error => next(error));
}

exports.updatechild = (request, response, next) => {
    const childId = request.body.id;
    Childern.updateOne({ _id: childId }, {
        $set: {
            fullName: request.body.fullName,
            age: request.body.age,
            level: request.body.level,
            address: request.body.address
        }
    })
    .then((data) => {
            if (data.matchedCount === 0)
                throw new Error("chield Not Found");
            else
                response.status(200).json(data);
        })
        .catch((error) => next(error));
}

exports.deletechild = (request, response, next) => {
    const childId = request.params.id;
    Childern.deleteOne({ _id: childId })
        .then((data) => {
            if (data.deletedCount === 0)
               throw new Error('Chield not found');
                
            else
                response.status(200).json(data);
        })
    .catch((error) => next(error));
}

exports.getChildById = (request, response, next) => {
    const childId = request.params.id;
    Childern.findById(childId)
        .then((data) => {
            if (!data)
                throw new Error("Child not found");
            else
                response.status(200).json(data);
        })
        .catch((error) => next(error));
}
