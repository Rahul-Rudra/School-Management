const express=require("express");
const mongoose=require('mongoose')
const cors=require('cors');
const multer=require('multer');
const path=require('path');
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
const port = process.env.PORT || 8001;
mongoose.set("useCreateIndex", true);
const connectDB = require("./connection/db");
connectDB();

app.use("/api/teachers",require("./routes/teacher"));
app.use("/api",require("./routes/auth"));
app.use("/api/students",require("./routes/student"));
app.use("/api/managements",require("./routes/management"));
app.use("/api/class",require('./routes/class'));


  
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//Upload

var storage = multer.diskStorage({  
  destination: './public/uploads/',
  filename(req,file,cb){  
      cb(null,file.originalname)  
  }  
})  

var upload = multer({storage:storage});  




var picSchema = new mongoose.Schema({  
  picspath:String  
})  


var picModel = mongoose.model('picsdemo',picSchema)  


 //app.set('view engine','ejs');  

app.set("views",path.resolve(__dirname,'views'));  

var picPath = path.resolve(__dirname,'public');  

app.use(express.static(picPath));  
 
//app.use(bodyParser.urlencoded({extended:false}))  

app.get('/file',(req,res)=>{  
  picModel.find((err,data)=>{  
           if(err){  
               console.log(err)  
           }  
          if(data){  
              //console.log(data)  
              res.json(data);  
          }   
         else{  
             res.json(data)  
         }   
  })        
})  


/* 
function convert(data) {
  let result = {}

  for (const property in data) {
    const key = data[property].label
    const value = data[property].value

    result = {
      ...result,
      [key]: value
    }
  }
  console.log(result)
  return result
}  */

app.post('/post', upload.single('pic'), (req,res)=>{  
 
   var x= 'uploads/'+req.file.path;  
   res.json(x)
  /* var picss = new picModel({  
      picspath:x  
  })  */  
   /* picss.save((err,data)=>{  
       if(err){  
           console.log(err)  
           res.json(err.message);
       }  
       else{  
           //console.log('data',data)  
           res.json(data);
         // res.redirect('/')  
       }  
  })    */
})  

app.get('/download/:id',(req,res)=>{  
   picModel.find({_id:req.params.id},(err,data)=>{  
       if(err){  
           console.log(err)  
       }   
       else{  
          var path= __dirname+'/public/'+data[0].picspath;  
         // console.log(path);
          res.download(path);  
       }  
   })  
}) 

app.listen(port, (req, res) => {
  console.log("Running");
});