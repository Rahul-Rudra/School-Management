const express=require('express');
const { check } = require('express-validator');
const mongoose=require('mongoose');
const { postClass } = require('../controllers/class');

const router=express.Router();

router.post("/",[
    check("class_id").isNumeric().isLength({min:1,max:2}),
    check("class_name").isString().not().isEmpty(),
],postClass)

module.exports=router;