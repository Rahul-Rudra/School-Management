const mongoose=require("mongoose");

const announcementSchema=new mongoose.Schema({
    text:{type:String,required:true},
    date:{type:Date,default:new Date()}
})

module.exports=mongoose.model("Announcement",announcementSchema);