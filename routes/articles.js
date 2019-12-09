var express=require('express');
let multer = require('multer');
let fs = require('fs');
const path=require('path');
const { check, validationResult } = require('express-validator/check');
let Article=require('../models/article.js');
let User=require('../models/user.js');
let Category=require('../models/category.js');
let router=express.Router();
router.get('/new',ensureAuthenticated,(req,res)=>{
    res.render('articles/new',{title:'Add Article'});
});
router.get('/addCategory',ensureAuthenticated,(req,res)=>{
    res.render('articles/addCategory',{title:'添加分类'});
});
router.get('/:id',(req,res)=>{
    Article.findById(req.params.id,(err,article)=>{
        User.findById(article.author,function(err,user){
            res.render(
                'articles/show',
                {
                    article:article,
                    author:user.name
                }
            );
        })
    });
});
router.get('/:id/edit',(req,res)=>{
    Article.findById(req.params.id,(err,article)=>{
        if(article.author!=req.user._id){
            req.flash('danger','not authenticated!');
            res.redirect('/');
        }else{
            res.render('articles/edit',
                {
                    article:article,
                    title:'Edit Article'
                }
            );
        }
    });
});
router.post('/uploadEdit/:id', multer({
    //设置文件存储路径
    dest: 'public/upload'   //upload文件如果不存在则会自己创建一个。
}).single('file'), function (req, res, next) {
    // var url = 'public/' + req.file.filename
    if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.render("error", {message: "上传文件不能为空！"});
        return
    } else {
        let file = req.file;
        let fileInfo = {};
        console.log(file);
        fs.renameSync('./public/upload/' + file.filename, './public/upload/' + file.originalname);//这里修改文件名字，比较随意。
        // 获取文件信息
        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = file.path;
        var pathNew='/upload/'+fileInfo.originalname;
        // 设置响应类型及编码
        // Article.findById(req.params.id,(err,article)=>{
        //    /*User.findById(article.author,function(err,user){
        //         res.render(
        //             'articles/show',
        //             {
        //                 article:article,
        //                 author:user.name
        //             }
        //         );
        //     })*/
        //
        //     article.fileName=pathNew
        // });
        Article.updateOne({_id:req.params.id}, {$set: {fileName:pathNew}},(err,article) =>{
            if (!err) {
                // console.log(article)
            } else {
                console.log(err)
            }
        })
        res.set({
            'content-type': 'application/json; charset=utf-8'
        });
        res.json({
            code : 200,
            data : pathNew
        })
        // res.end("上传成功！");
    }
});
router.post('/uploadCategory', multer({
    //设置文件存储路径
    dest: 'public/upload'   //upload文件如果不存在则会自己创建一个。
}).single('file'), function (req, res, next) {
    // var url = 'public/' + req.file.filename
    if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.render("error", {message: "上传文件不能为空！"});
        return
    } else {
        let file = req.file;
        let fileInfo = {};
        console.log(file);
        fs.renameSync('./public/upload/' + file.filename, './public/upload/' + file.originalname);//这里修改文件名字，比较随意。
        // 获取文件信息
        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = file.path;
        var pathNew='/upload/'+fileInfo.originalname;
        // 设置响应类型及编码
        // Article.findById(req.params.id,(err,article)=>{
        //    /*User.findById(article.author,function(err,user){
        //         res.render(
        //             'articles/show',
        //             {
        //                 article:article,
        //                 author:user.name
        //             }
        //         );
        //     })*/
        //
        //     article.fileName=pathNew
        // });
        // Article.updateOne({_id:req.params.id}, {$set: {fileName:pathNew}},(err,article) =>{
        //     if (!err) {
        //         // console.log(article)
        //     } else {
        //         console.log(err)
        //     }
        // })
        res.set({
            'content-type': 'application/json; charset=utf-8'
        });
        res.json({
            code : 200,
            data : pathNew
        })
        // res.end("上传成功！");
    }
});
router.post('/upload', multer({
    //设置文件存储路径
    dest: 'public/upload'   //upload文件如果不存在则会自己创建一个。
}).array('file', 8), function (req, res, next) {
    console.log(req.files)
    // var url = 'public/' + req.file.filename
   if (req.files.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
      res.render("error", {message: "上传文件不能为空！"});
      return
  } else {
       /* let file = req.file;
       console.log(file);
     let file = req.file;
       let fileInfo = {};
       console.log(file);
       fs.renameSync('./public/upload/' + file.filename, './public/upload/' + file.originalname);//这里修改文件名字，比较随意。
       // 获取文件信息
       fileInfo.mimetype = file.mimetype;
       fileInfo.originalname = file.originalname;
       fileInfo.size = file.size;
       fileInfo.path = file.path;
       var pathNew='/upload/'+fileInfo.originalname;
       // 设置响应类型及编码
       Article.findById(req.params.id,(err,article)=>{
          User.findById(article.author,function(err,user){
               res.render(
                   'articles/show',
                   {
                       article:article,
                       author:user.name
                   }
               );
           })
           article.fileName=pathNew
       });
       res.set({
           'content-type': 'application/json; charset=utf-8'
       });
       res.json({
           code : 200,
           data : pathNew
       })*/
      // res.end("上传成功！");
       let files = req.files;
       let images=[];
       files.forEach(function (item) {
           let fileInfo = {};
           fs.renameSync('./public/upload/' + item.filename, './public/upload/' + item.originalname);//这里修改文件名字，比较随意。
           fileInfo.mimetype = item.mimetype;
           fileInfo.originalname = item.originalname;
           fileInfo.size = item.size;
           fileInfo.path = item.path;
           fileInfo.pathNew='/upload/'+fileInfo.originalname;
           images.push(fileInfo);
       })
       res.json({
           code : 200,
           data : images
       })
       console.log(images)
  }
});
router.post('/addCategorySubmit',(req,res)=>{
        console.log(req.body)
        /*let file = req.file;
        let fileInfo = {};
        console.log(file);
        fs.renameSync('./public/upload/' + file.filename, './public/upload/' + file.originalname);//这里修改文件名字，比较随意。
        // 获取文件信息
        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = file.path;
        res.locals.imgs=['http://pic22.nipic.com/20120620/9644879_220135570113_2.jpg'];
        // 设置响应类型及编码
        res.set({
            'content-type': 'application/json; charset=utf-8'
        });*/
        let category=new Category(req.body);
        category.save((err,data)=>{
                if(err) throw err;
                req.flash("success", "");
                res.redirect('/');
            })
});
router.post('/create',[
    check('title').isLength({min:1}).withMessage('Title is required'),
    check('body').isLength({min:1}).withMessage('Body is required'),
    // check('author').isLength({min:1}).withMessage('Author is required'),
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(422).json({ errors: errors.array() });
        console.log(errors.array());
        res.render('articles/new',{errors:errors.array(),title:'Add Article'});
    }else{
        console.log(req.body)
        /*let file = req.file;
        let fileInfo = {};
        console.log(file);
        fs.renameSync('./public/upload/' + file.filename, './public/upload/' + file.originalname);//这里修改文件名字，比较随意。
        // 获取文件信息
        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = file.path;
        res.locals.imgs=['http://pic22.nipic.com/20120620/9644879_220135570113_2.jpg'];
        // 设置响应类型及编码
        res.set({
            'content-type': 'application/json; charset=utf-8'
        });*/
        let articles=new Article(req.body);
        // console.log(req)
        articles.author=req.user._id;
        articles.save((err,data)=>{
            if(err) throw err;
            // req.flash("success", "Artticle Add");
            res.redirect('/');
        })
    }
});
router.post('/update/:id',(req,res)=>{
    let query={_id:req.params.id};
    Article.update(query,req.body,(err,data)=>{
        if(err) throw err;
        req.flash("success", "Artticle Update");
        res.redirect('/');
    })
});
router.post('/getCate/:cateId',(req,res)=>{
    let query={cateId:req.params.cateId};
    Category.find(query,(err,category)=>{
        console.log(category)
        if(err) throw err;
        res.json({
            code : 200,
            data : category
        })
        // Article.find({},(err,articles)=>{
        //     if(err) throw err;
        //     res.render('articles/index',
        //         {
        //             articles:articles,
        //             categories:category,
        //         }
        //     );
        // })

    })
});
router.delete('/delete/:id',(req,res)=>{
    if(!req.user._id){
        return res.status(500).send();
    }
    let query={_id:req.params.id};    
    Article.findById(req.params.id,function(err,article){
        if(article.author!=req.user._id){
            res.status(500).send('没有授权');
        }else{
            Article.deleteOne(query,(err)=>{
                if(err) {
                    throw err
                }else{
                    res.send('success');
                }
            });
        }
    });

});
router.post('/comment/:id',(req,res)=>{
    var com=req.body;
    var obj={
        myComment:com.comment,
        author:req.user.name
    };
    var commentsArray;
    Article.findById(req.params.id,function(err,article){
        if(article.comments.length){
            commentsArray=article.comments;
        }else{
            commentsArray=[];
        }
        commentsArray.unshift(obj);
        Article.updateOne({_id:req.params.id}, {$set: {comments:commentsArray}},(err,article) =>{
            if (!err) {
                // console.log(article)
                res.json({
                    code : 200,
                    data : obj
                })
            } else {
                console.log(err)
            }
        })
    });
});
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('danger','Please login!');
        res.redirect('/users/login');
    }
};
module.exports=router