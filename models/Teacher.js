const mongoose=require("mongoose");

const teacherSchema=new mongoose.Schema({
    teacher_name:{type:String,required:true},
    email:{type:String,required:true},
    Date_of_birth:{type:Date,required:true},
    password:{type:String,required:true,minlength:6},
    class_name:{type:String,default:null},
    role: {
        type: String,
        default: "teacher",
        enum: ["superAdmin", "Admin", "teacher"],
      }, 
    student_id:[
        {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        }
    ],

})

module.exports=mongoose.model("Teacher",teacherSchema);