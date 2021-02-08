const express=require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db=require('../models/Teacher');
//const { check, validationResult } = require("express-validator/check");
const Student = require('../models/Student');

const fs=require("fs")
//const upload = multer({ dest: 'uploads/' })
require('dotenv').config();




const postTeacher=async(req,res)=>{
    
    try {
      let teacher = await db.findOne({ email: req.body.email });
      if (teacher) {
        let err = "Teacher already exists";
        return res
          .status(400)
          .json({ error: [{ msg: "Teacher already exists" }], err });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
  
      teacher = new db({
        teacher_name: req.body.teacher_name,
        email: req.body.email,
        Date_of_birth:req.body.Date_of_birth,
        password: hashed,
        
      });
  
      if (Object.keys(req.body).length === 4) {
        await teacher.save();
  
        res.json(teacher);
  
     
      } else {
        return res.status(400).json({ msg: "In body there must be 3 key-value" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
}

const getAllTeacher=async(req,res)=>{
  try {
    const result=await db.find().select("-password");
    res.json(result);
  } catch (error) {
    res.json(error);
  }

}

const assignClassToTeacher=async(req,res)=>{
  try {
    // const Reg_no=req.body.Reg_no;
    const teacher=await db.findByIdAndUpdate(req.params.id);
    const student=await Student.find({className:req.body.class_name});
    //console.log(student[0]);
    //console.log(teacher)
    if(student)
    {
      student.map(async(st,i)=>{
          student[i].teacher_id.id=req.params.id,
          student[i].teacher_id.teacherName=teacher.teacher_name
          teacher.student_id.push(student[i]._id);
          await student[i].save();
      })
     
    }
    
    if(teacher)
    {
     teacher.class_name=req.body.class_name;

     await teacher.save();
      res.json(teacher);
    }
   else{
     res.json("no class or student with this ID");
   }
   
  
   } catch (error) {
     res.json(error.message);
   }
  }

 const getTeacherById=async(req,res)=>{
   try {
     const teacher=await db.findById(req.params.id);
     //res.json(teacher.student_id)
     let Reg_no="";
       let student_name="";
       let email="";
      const result={
       Reg_no,
       student_name,
       email,

     }; 
      const cart=[];
      for(let key in teacher.student_id) {
        const student=await Student.findById(teacher.student_id[key]);
        cart.push(student);
    }
  
     res.json(cart)
     
     
     
   } catch (error) {
     res.json(error.message);
   }
 } 

module.exports={
    postTeacher,
    getAllTeacher,
    assignClassToTeacher,
    getTeacherById,
}