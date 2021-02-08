const express=require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db=require('../models/Management');
const { check, validationResult } = require("express-validator/check");
const Announcement=require('../models/Announcement')
require('dotenv').config();

const postManagement=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(406).json({ errors: errors.array() });
    }  
    try {
      let management = await db.findOne({ email:req.body.email });
      if (management) {
        let err = "Management already exists";
        return res
          .status(400)
          .json({ error: [{ msg: "management already exists" }], err });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
  
      management = new db({
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        
      });
  
      if (Object.keys(req.body).length === 3) {
        await management.save();
  
        res.json(management);
  
     
      } else {
        return res.status(400).json({ msg: "In body there must be 3 key-value" });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
}

const getAllManagement=async(req,res)=>{
  try {
    const result=await db.find().select("-password");
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }

}

const getAnnouncement=async(req,res)=>{
  
  try {
    const result=await Announcement.find().sort({'date':-1});
    res.json(result);
  } catch (error) {
    res.json(error.message)
  }
}

const postAnnouncement=async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ errors: errors.array() });
  }  
  try {
    let data=new Announcement({
      text:req.body.text
    })

    await data.save();
    res.json(data);
    
  } catch (error) {
    res.json(error.message);
  }
}


module.exports={
    postManagement,
    getAllManagement,
    postAnnouncement,
    getAnnouncement
}