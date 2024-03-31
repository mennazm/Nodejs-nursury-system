const { body, param, query } = require("express-validator");

exports.post  = [
    body("name").isString().withMessage("Name must be string"),
    body("supervisor").isMongoId().withMessage("supervisor must be object id"),
    body("children").isArray().withMessage("children must be array of ids"),
    body("children.*").isNumeric().withMessage("children must be array of ids"),
];

exports.update = [
    body("id").isInt().withMessage("Id Shoud be Number"),
    body("name").optional().isString().withMessage("Name must be string"),
    body("supervisor").optional().isMongoId().withMessage("supervisor must be object id"),
    body("children").optional().isArray().withMessage("children must be array of ids"),
    body("children.*").optional().isNumeric().withMessage("children must be array of ids"),
];

exports.delete = [
    body("id").isInt().withMessage("Id Shoud be Number")
]