const mongoose = require("mongoose");

const schema = mongoose.Schema({
     _id:mongoose.Schema.Types.ObjectId,
     fullName:String,
     email:{
          type: String,unique: true
      },
      image:String,
      password: { type: String, required: true, length: {min: 8} },
      isSupervisor: Boolean

});

mongoose.model("teachers",schema); 

