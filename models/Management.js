const mongoose=require("mongoose");
//const management = require("../controllers/management");

const managementSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role: {
        type: String,
        default: "management",
        enum: ["superAdmin", "Admin", "management"],
      }, 
})

module.exports=mongoose.model("Management",managementSchema);