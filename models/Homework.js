const mongoose=require("mongoose");

const homeworkSchema=new mongoose.Schema({
    file:{
        type:String,
       required:true
        
    }
})

module.exports=mongoose.model("Homework",homeworkSchema);
