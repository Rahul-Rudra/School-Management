const mongoose=require('mongoose');

const studentSchema = new mongoose.Schema({
    Reg_no:{type:Number,required:true,unique:true},
    student_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fatherName:{type:String,required:true},
    motherName:{type:String,required:true},
    mobile_no:{type:Number,required:true},
    fatherMobileNo:{type:Number,required:true},
    DOB:{type:Date,required:true},
    className:{type:String,required:true},
    role: {
      type: String,
      default: "student",
      enum: ["superAdmin", "Admin", "student"],
    }, 
    password: { type: String, required: true },
    teacher_id:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
          },
          teacherName: String(),
    }
  });
  
  module.exports = mongoose.model("Student", studentSchema);