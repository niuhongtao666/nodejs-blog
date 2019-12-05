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
    fileName1:{
        type:String,
        // required:true
    },
    fileName2:{
        type:String,
        // required:true
    },
    fileName3:{
        type:String,
        // required:true
    },
    fileName4:{
        type:String,
        // required:true
    },
    fileName5:{
        type:String,
        // required:true
    },
    fileName6:{
        type:String,
        // required:true
    },
    fileName7:{
        type:String,
        // required:true
    },
    // file:{
    //     type:String,
    //     // required:true
    // },
    body:{
        type:String,
        // required:true
    },
    p1:{
        type:String,
    },
    p2:{
        type:String,
    },
    p3:{
        type:String,
    },
    p4:{
        type:String,
    },
    p5:{
        type:String,
    },
    p6:{
        type:String,
    },
    p7:{
        type:String,
    },
    p8:{
        type:String,
    },
    link:{
        type:String,
    },
    comments:{
        type:Array,
    },

})
let Article=module.exports=mongoose.model("Article",articleSchema);