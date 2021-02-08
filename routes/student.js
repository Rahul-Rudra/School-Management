const express=require('express');
const mongoose=require('mongoose');
const { check, validationResult } = require("express-validator/check");

const {postStudent,getAllStudent, editStudent, getStudentWithId,deleteStudent}=require('../controllers/student');

const router=express.Router();

router.get("/",getAllStudent)
router.get("/:id",getStudentWithId);
router.delete("/:id",deleteStudent);
router.put("/:id",[
  check("student_name", "please include name").not().isEmpty().isLength({ min: 3 }),
  check("email", "please mention a valid email").isEmail(),
  check("fatherName").isString().not().isEmpty().isLength({min:3}),
  check("motherName").not().isEmpty().isLength({min:3}),
  check("mobile_no").isNumeric().isLength({min:10,max:10}),
  check("fatherMobileNo").isNumeric().isLength({min:10,max:10}),
  check('DOB').not().isEmpty().isDate(),
],editStudent)

router.post(
    "/register",
    [
        check("Reg_no").isNumeric().isLength({min:4,max:4}),
      check("student_name", "please include name").not().isEmpty().isLength({ min: 3 }),
      check("email", "please mention a valid email").isEmail(),
      check("fatherName").isString().not().isEmpty().isLength({min:3}),
      check("motherName").not().isEmpty().isLength({min:3}),
      check("mobile_no").isNumeric().isLength({min:10,max:10}),
      check("fatherMobileNo").isNumeric().isLength({min:10,max:10}),
      check('DOB').not().isEmpty().isDate(),
      check(
        "password",
        "please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
    ],
    postStudent
  );


module.exports=router;