const mongoose =require("mongoose");
const bcrypt = require("bcrypt");
require("../Model/teacherModel");
const teacherSchema = mongoose.model("teachers");



// nnnn

module.exports = async(req, res, next)=>{
    if(req.token.role === "admin" || req.token._id === +req.params.id)
    {
        try{
            let {newPassword} = req.body;
            let user = await teacher.findOne({_id: req.params.id});
            if(!user)
                throw new Error("user doesn't exist");
            if(await bcrypt.compare(newPassword, user.password))
            {
                res.status(200).json({message: "the password you entered is the same as the old one enter a new pasword"});
            }
            else
            {
                user.password = await bcrypt.hash(newPassword, 10);
                user.save();
                res.status(200).json({message: "password is changed successfully"});
            }
        }catch(err)
        {
            next(err);
        }
    }
    else
    {
        res.status(401).json({message: "Unauthorized"})
    }
}
