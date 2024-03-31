const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    _id: Number,
    fullName: String,
    age: { type: Number, min: 2, max: 6 },
    level: { type: String, enum: ["PREKG", "KG1", "KG2"] },
    address: {
        city: String,
        street: String,
        building: Number,
    }
});
schema.plugin(AutoIncrement,{
    id: 'child_model_id_counter',
    inc_field: "_id"
});
mongoose.model("childern", schema);
