const mongoose=require('mongoose');
let userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    beMaster:{
        type:Boolean,
        // required:true
    },
})
let User=module.exports=mongoose.model("User",userSchema);