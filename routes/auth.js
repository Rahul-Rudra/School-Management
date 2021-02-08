const express=require('express');
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/authenticate");
const Admin=require('../models/Admin')

//const db = require("../models/User");
const { getTeacherToken,getStudentToken, getManagementToken,getAdminToken} = require("../controllers/auth");

router.post(
  "/teachers/login",
  [
    check("email", "please mention a valid email").isEmail(),
    check("password", "password is required").exists().isLength({ min: 6 }),
  ],
  getTeacherToken
);

router.post(
    "/students/login",
    [
      check("Reg_no", "please mention a valid Reg_no").isNumeric().isLength({min:4,max:4}),
      check("password", "password is required").exists().isLength({ min: 6 }),
    ],
    getStudentToken
  );
  

  router.post(
    "/managements/login",
    [
      check("email", "please mention a valid email").isEmail(),
      check("password", "password is required").exists().isLength({ min: 6 }),
    ],
    getManagementToken
  );
  
  
  router.post("/admin/login", [
    check("email", "please mention a valid email").isEmail(),
    check("password", "password is required").exists().isLength({ min: 6 }),
  ],getAdminToken);


  //Admin register

  router.post("/admin/register", [
    check("name", "please include name").not().isEmpty().isLength({ min: 3 }),
    check("email", "please mention a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(406).json({ errors: errors.array() });
    }  
    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        let err = "Admin already exists";
        return res
          .status(400)
          .json({ error: [{ msg: "Admin already exists" }], err });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
  
      admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        
      });
  
      if (Object.keys(req.body).length === 3) {
        await admin.save();
  
        res.json(admin);
  
     
      } else {
        return res.status(400).json({ msg: "In body there must be 3 key-value" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  })
module.exports = router;