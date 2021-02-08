const mongoose=require('mongoose');

const classSchema=new mongoose.Schema({
    class_id:{type:Number,required:true,unique:true},
    class_name:{type:String,required:true,unique:true},

})

module.exports=mongoose.model("Class",classSchema);