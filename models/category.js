const mongoose=require('mongoose');
let userSchema=new mongoose.Schema({
    cateId:{
        type:String,
        required:true
    },
    name:{
        type:String,
    },
    describe:{
        type:String,
    },
    shape:{
        type:String,
    },
    feed:{
        type:String,
    },
    environment:{
        type:String
    },
    fileName:{
        type:String,
    },
})
let Category=module.exports=mongoose.model("Category",userSchema);