const mongoose=require('mongoose');
let userSchema=new mongoose.Schema({
    cateId:{
        type:String,
        required:true
    },
    name:{
        type:String,
    },
    fileName:{
        type:String,
    },
})
let Category=module.exports=mongoose.model("Category",userSchema);