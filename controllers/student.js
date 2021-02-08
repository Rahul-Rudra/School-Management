const express = require("express");
const db = require("../models/Student");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Class = require("../models/Class");
const Teacher = require("../models/Teacher");

const postStudent=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(406).json({ errors: errors.array() });
    }  
    try {
      let student = await db.findOne({ email: req.body.email ,Reg_no:req.body.Reg_no});
     // const count=await db.count({})
      if (student) {
        let err = "Student already exists with this email or reg_no";
        return res
          .status(400)
          .json({ error: [{ msg: "Student already exists" }], err });
      }
      const teacher=await Teacher.findOne({class_name:req.body.className});
     // const len=teacher.student_id.length();
      //console.log(teacher);
    
      
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
  
      student = new db({
        Reg_no:req.body.Reg_no,
        student_name: req.body.student_name,
        email: req.body.email,
        fatherName:req.body.fatherName,
        motherName:req.body.motherName,
        mobile_no:req.body.mobile_no,
        fatherMobileNo:req.body.fatherMobileNo,
        DOB:req.body.DOB,
        className:req.body.className,
        password: hashed,
        
      });
  
      if (Object.keys(req.body).length === 10) {
        await student.save();
        if(teacher)
        {
          student.teacher_id.id=teacher._id;
          student.teacher_id.teacherName=teacher.teacher_name;
          teacher.student_id.push(student._id);
          await teacher.save();
        }

       
       
        await student.save();
        res.json(student);
  
     
      } else {
        return res.status(400).json({ msg: "In body there must be 10 key-value" });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
}

const getAllStudent=async(req,res)=>{
  try {
    const result=await db.find().select("-password");
    res.json(result);
  } catch (error) {
    res.json(error);
  }

}

const editStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const student = await db.findByIdAndUpdate(req.params.id,req.body);
    await student.save();

    res.json({ msg: "Successfully updated" });
  } catch (error) {
    res.status(500).send("server error");
  }
};

const getStudentWithId=async(req,res)=>{
  const result = await db.findById(req.params.id);
  res.json(result);
  console.log(result.name);
}

const deleteStudent=async(req,res)=>{
  try {
    const result = await db.findByIdAndRemove(req.params.id);
  res.json({ message: "Successfully deleted" });
  } catch (error) {
    res.json(error.message)
  }
  
}

module.exports={
    postStudent,
    getAllStudent,
    editStudent,getStudentWithId,
    deleteStudent

}