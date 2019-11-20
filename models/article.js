const mongoose=require('mongoose');
let articleSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    fileName:{
        type:String,
        // required:true
    },
    file:{
        type:String,
        // required:true
    },
    body:{
        type:String,
        required:true
    },
})
let Article=module.exports=mongoose.model("Article",articleSchema);