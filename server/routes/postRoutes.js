const express = require("express");
const multer =require("multer");
const bodyParser= require("body-parser");
const path=require("path");
const posts=express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
posts.use(bodyParser.urlencoded({extended:true}));
posts.use(express.static(path.resolve(__dirname,'public')));
const postsController=require('../controller/postsController');


posts.post('/newpost', upload.single('image'),postsController.InsertPost);
posts.post('/posts',postsController.GetPosts);

module.exports=posts;