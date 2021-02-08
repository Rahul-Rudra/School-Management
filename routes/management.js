const express=require('express');
const mongoose=require('mongoose');
const { check, validationResult } = require("express-validator/check");

const {postManagement,getAllManagement, postAnnouncement, getAnnouncement}=require('../controllers/management')

const router=express.Router();

router.get("/",getAllManagement);


router.post("/announcement",[
  check("text").isString()
],postAnnouncement)

router.post(
    "/register",
    [
      check("name", "please include name").not().isEmpty().isLength({ min: 3 }),
      check("email", "please mention a valid email").isEmail(),
      check(
        "password",
        "please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
    ],
    postManagement
  );

  router.get("/announcement",getAnnouncement);

module.exports=router;