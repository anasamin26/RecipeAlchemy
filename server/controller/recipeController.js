const csv = require('csvtojson');
const fs = require('fs');

const ObjectId = require("mongodb").ObjectId;
const dbo = require("../database/dbcon");

const importRecipes = async (req, res) => {
    try {
        const batchSize = 100; // Adjust based on your needs
        const recipesData = [];
        let batchCount = 0;

        const stream = fs.createReadStream(req.file.path)
            .pipe(csv({ delimiter: ';', fork: true }));

        stream.on('data', async (data) => {
            // Process each chunk of data
            recipesData.push({
                title: data.title,
                ingredients: data.ingredients,
                directions: data.directions,
                link: data.link,
                source: data.source,
                NER: data.NER,
            });

            if (recipesData.length >= batchSize) {
                // Insert the batch into MongoDB
                await Recipe.create(recipesData);
                batchCount++;
                recipesData.length = 0; // Clear the array
            } 
        });

        stream.on('end', async () => {
            // Insert any remaining records
            if (recipesData.length > 0) {
                await Recipe.create(recipesData);
                batchCount++;
            }

            console.log(`Imported ${batchCount} batches of recipes.`);
            res.send({ status: 200, success: true, msg: 'Recipe File Imported' });
        });
    } catch (error) {
        console.error('Error importing recipes:', error.message);
        res.status(500).send({ status: 500, success: false, msg: 'Internal Server Error' });
    }
};

const getAllRecipes = async(req,res)=>{
try{
    let db_connect = dbo.getDb();

    db_connect
      .collection("Recipes")
      .find({}).skip(10).limit(10)
      .toArray()
      .then((data) => {
        console.log(data);
        res.json(data);
      });

}catch(error){
    console.error('Error in getting recipies',error.message);
    res.status(400).send({ status: 400, success: false, msg: 'Internal Server Error' });
}

};

const getSingleRecipe = async (req, res) => {
    try {
      let db_connect = dbo.getDb();
      let my_query = { _id: new ObjectId(req.params.id) };
      console.log(my_query);
      const data = await db_connect.collection("Recipes").findOne(my_query);
      console.log(data);
      res.json(data);
    } catch (error) {
      res.send({ status: 400, success: false, message: error.message });
    }
  };

  const suggestTop5Recipes = async (req, res) => {
    try {
      let userNER = req.body.NER;
      console.log(userNER);
  
      // Remove duplicates from the userNER array
      userNER = [...new Set(userNER)];
  
      const db_connect = dbo.getDb();
  
      if (!db_connect) {
        console.error('Database connection not established');
        return res.status(500).json({ status: 500, success: false, message: 'Database connection not established' });
      }
  
      // Ensure exact match of NER array
      const query = { NER: { $eq: userNER } };
      const exactMatchRecipe = await db_connect.collection('Recipes').findOne(query);
  
      if (exactMatchRecipe) {
        // If exact match found, return only that recipe
        res.json([exactMatchRecipe]);
      } else {
        // If no exact match, proceed with high match logic
  
        const batchSize = 1000;
        const promises = [];
  
        for (let skip = 0; skip < 140000; skip += batchSize) {
          const promise = db_connect.collection('Recipes').find({ "NER": { $all: userNER } }).skip(skip).limit(batchSize).toArray();
          promises.push(promise);
        }
  
        const batches = await Promise.all(promises);
        const allRecipes = batches.flat();
  
        // Separate recipes with 100% NER match and 90% or higher NER match
        const highMatchRecipes = [];
  
        allRecipes.forEach(recipe => {
          const matchingNERCount = recipe.NER.filter(ner => userNER.includes(ner)).length;
          const percentageMatching = (matchingNERCount / userNER.length) * 100;
  
          if (percentageMatching >= 90) {
            highMatchRecipes.push(recipe);
          }
        });
  
        // Sort the high match recipes by the number of matching ingredients in descending order
        highMatchRecipes.sort((a, b) => b.NER.filter(ing => userNER.includes(ing)).length - a.NER.filter(ing => userNER.includes(ing)).length);
  
        // Return the top 5 matching recipes
        const top5Recipes = highMatchRecipes.slice(0, 5);
  
        res.json(top5Recipes);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, success: false, message: 'Internal server error' });
    }
  };
  
  
  
  
  
  
module.exports = { importRecipes, getAllRecipes,getSingleRecipe,suggestTop5Recipes};
