const express = require("express");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Teacher=require('../models/Teacher');
const Student=require('../models/Student');
const Management = require("../models/Management");
const Admin=require('../models/Admin')
require("dotenv").config();


// Teacher Login

const getTeacherToken = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ msg: "teacher not exists" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "password incorrect" });
    }

   
    
      /*const payload = {
          id: user.id,
        };*/
      const Date_of_birth = teacher.Date_of_birth;
      const id = teacher.id;
      const teacher_name = teacher.teacher_name;
      const role=teacher.role;
     const class_name=teacher.class_name;
      jwt.sign({class_name,Date_of_birth, id,role, teacher_name }, process.env.SECRET_KEY, (err, token) => {
        if (err) throw err;
        res.json({ token,class_name, Date_of_birth,role, id, teacher_name });
       });
   
  } catch (error) {
    res.status(500).send(error);
  }
};



// Student Login

const getStudentToken = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const {  password } = req.body;
  
    try {
      let student = await Student.findOne({ Reg_no:req.body.Reg_no });
      if (!student) {
        return res.status(400).json({ msg: "student not exists" });
      }
  
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "password incorrect" });
      }
  
     
      
        /*const payload = {
            id: user.id,
          };*/
        //const Date_of_birth = teacher.Date_of_birth;
        const id = student.id;
        const Reg_no=student.Reg_no;
        const role=student.role;
        const student_name=student.student_name;
        const DOB=student.DOB;
        const className=student.className;
       // const teacher_name = teacher.teacher_name;
        jwt.sign({ student_name,DOB,className,Reg_no,id,role}, process.env.SECRET_KEY, (err, token) => {
          if (err) throw err;
          res.json({ token, id,role,Reg_no,student_name,className,DOB});
         });
     
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  

// management Login


const getManagementToken = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
  
    try {
      let management= await Management.findOne({ email });
      if (!management) {
        return res.status(400).json({ msg: "management not exists" });
      }
  
      const isMatch = await bcrypt.compare(password, management.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "password incorrect" });
      }
      
        const id = management.id;
        const role=management.role;
        const name=management.name;
        jwt.sign({  name,role,id}, process.env.SECRET_KEY, (err, token) => {
          if (err) throw err;
          res.json({ token,name,role,id});
         });
     
    } catch (error) {
      res.status(500).send(error);
    }
  };
  


  //Admin login

  const getAdminToken=async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
  
    try {
      let admin= await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ msg: "admin not exists" });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "password incorrect" });
      }
        const id = admin.id;
        const role=admin.role;
        const name=admin.name
        jwt.sign({  name,role,id}, process.env.SECRET_KEY, (err, token) => {
          if (err) throw err;
          res.json({ token,name,role, id});
         });
     
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  

module.exports={
    getTeacherToken,
    getStudentToken,
    getManagementToken,
    getAdminToken
}