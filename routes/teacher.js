const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const Homework=require("../models/Homework");
const multer=require("multer")
const { check, validationResult } = require("express-validator/check");

const {postTeacher, getAllTeacher, assignClassToTeacher, getTeacherById}=require('../controllers/teacher')
 const{validateRequest,isVaidated}=require('../validator/validate')
const router=express.Router();

router.post(
    "/",validateRequest,isVaidated,postTeacher
  );

  router.patch("/:id",[
    check("class_name").notEmpty().isString(),assignClassToTeacher
  ])
  router.get("/",getAllTeacher)

  router.get("/:id",getTeacherById)
  

//File upload routing...

/* 
  const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('file');

  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
 */
/* const multercon={
  storage:multer.diskStorage({
    destination:function(req,file,next){
      next(null,'./public/upload');
    },
    filename:function(req,file,next){
      const ext=file.mimetype.split('/')[1];
      next(null,file.fieldname+"-"+Date.now()+"-"+ext);
    }
  }),
  fileFilter:function(req,file,next){
    if(!file)
    {
      next();
    }
  }
} */

  /* router.post('/homework', multer(multercon).single('myfile'),function(req,res){
    try {
      res.json("successfully uploaded");
    } catch (error) {
      res.json(error.message);
    }
    
  })
 */
/* const validate=()=>{
  if( !mongoose.Types.ObjectId.isValid(id) ) return false;
}
  router.post('/homework',(req, res) => {
    try {
      upload(req, res, (err) => {
        if(err){
         res.json(err.message);
        } else {
          if(req.file == undefined){
            res.json("No file selected");
          } else {
          // console.log(req.file);
            const d=new Homework({
              file:req.file.path
            })
            d.save()
            res.json( {
              msg: 'File Uploaded!',
              d
            });
          }
        }
      });
      
    } catch (error) {
      console.log(error.message);
    }
     
  });

router.get("/homework",async(req,res)=>{
  try {
    const result=await Homework.find();
    res.json(result);
  } catch (error) {
    //console.log("errr")
    res.json(error);
  }
}) */

module.exports=router;