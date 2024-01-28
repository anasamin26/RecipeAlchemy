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

    userNER = [...new Set(userNER)];

    const db_connect = dbo.getDb();

    if (!db_connect) {
      console.error('Database connection not established');
      return res.status(500).json({ status: 500, success: false, message: 'Database connection not established' });
    }

    const pipeline = [
      { $match: { "NER": { $all: userNER } } },
      {
        $project: {
          recipe: "$$ROOT",
          matchingNERCount: { $size: { $setIntersection: ["$NER", userNER] } },
          totalNERCount: { $size: "$NER" }
        }
      },
      {
        $addFields: {
          percentageMatching: { $multiply: [{ $divide: ["$matchingNERCount", "$totalNERCount"] }, 100] }
        }
      },
      { $sort: { percentageMatching: -1 } },
      { $limit: 5 }
    ];

    const matchedRecipes = await db_connect.collection('Recipes').aggregate(pipeline).toArray();

    if (matchedRecipes.length < 5) {
      // If there are less than 5 recipes, fill the remaining slots with additional matches
      const additionalRecipes = await db_connect.collection('Recipes')
        .find({ "NER": { $all: userNER } })
        .limit(5 - matchedRecipes.length)
        .toArray();

      matchedRecipes.push(...additionalRecipes);
    }

    // Extract the original recipes without additional fields
    const top5Recipes = matchedRecipes.map(recipe => recipe.recipe);

    res.json(top5Recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, message: 'Internal server error' });
  }
};

const suggestTop5RecipesByTitle = async (req, res) => {
  try {
    const userTitle = req.body.title;
    console.log(userTitle);

    const db_connect = dbo.getDb();

    if (!db_connect) {
      console.error('Database connection not established');
      return res.status(500).json({ status: 500, success: false, message: 'Database connection not established' });
    }

    const pipeline = [
      { $match: { "title": userTitle } },
      {
        $project: {
          recipe: "$$ROOT",
          matchingTitleCount: { $cond: { if: { $eq: ["$title", userTitle] }, then: 1, else: 0 } }
        }
      },
      { $sort: { matchingTitleCount: -1 } },
      { $limit: 5 }
    ];

    const matchedRecipes = await db_connect.collection('Recipes').aggregate(pipeline).toArray();

    if (matchedRecipes && matchedRecipes.length > 0) {
      const additionalRecipes90 = await db_connect.collection('Recipes')
        .find({ "title": { $regex: userTitle, $options: 'i' } }) // Case-insensitive partial match
        .limit(5 - matchedRecipes.length)
        .toArray();

      matchedRecipes.push(...additionalRecipes90.filter(recipe => recipe !== null));

      if (matchedRecipes.length < 5) {
        const additionalRecipes80 = await db_connect.collection('Recipes')
          .find({ "title": { $regex: userTitle, $options: 'i' } }) // Case-insensitive partial match
          .limit(5 - matchedRecipes.length)
          .toArray();

        matchedRecipes.push(...additionalRecipes80.filter(recipe => recipe !== null));
      }
    }

    const top5Recipes = matchedRecipes
      ? matchedRecipes.map(recipe => (recipe ? recipe.recipe : null)).filter(recipe => recipe !== null)
      : [];

    res.json(top5Recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, success: false, message: 'Internal server error' });
  }
};



  
  
  
  
  
  
  
  
module.exports = { importRecipes, getAllRecipes,getSingleRecipe,suggestTop5Recipes,suggestTop5RecipesByTitle};
