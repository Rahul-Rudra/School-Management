const express=require('express');
const { body, validationResult } = require("express-validator");
const db=require('../models/Class');

const postClass = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const class1 = new db({
        class_name:req.body.class_name,
      });
      await class1.save();
      res.json(class1);
    } catch (error) {
      res.status(500).json("server error");
    }
  };

  module.exports={
      postClass
  }