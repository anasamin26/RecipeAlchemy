const express = require("express");
const multer =require("multer");
const bodyParser= require("body-parser");
const path=require("path");

const recipes=express();


recipes.use(bodyParser.urlencoded({extended:true}));
recipes.use(express.static(path.resolve(__dirname,'public')));

var storage= multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./public/uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})
var upload=multer({storage:storage});
const recipeController=require('../controller/recipeController');

//defining routes now

//trying to upload the file in csv to be inserted in the db but didnt work so i used direct import using the mongodb compas
recipes.post('/importRecipes',upload.single('file'),recipeController.importRecipes)

//lets just get some recipes
recipes.get('/getRecipes',recipeController.getAllRecipes);

//lets get data of a specific record
recipes.get('/Recipe/:id',recipeController.getSingleRecipe);

//lets get the top 5 recipies based on user searched ingrediants
recipes.post('/suggestTop5Recipes',recipeController.suggestTop5Recipes);



//exporting routes


module.exports=recipes;