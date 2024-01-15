const { MongoClient } = require("mongodb");

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let _db;

module.exports = {
  connectToServer: async function () {
    try {
      await client.connect();
      console.log("Connected to MongoDB");

      // Accessing the database and collection here is optional
      _db = client.db("RecipesData");
      var count = await _db.collection("Recipes").countDocuments();
      console.log(`Number of documents in Recipes collection: ${count}`);
    } catch (e) {
      console.error("Error connecting to MongoDB:", e);
      throw e;
    }
  },

  getDb: function () {
    if (!_db) {
      console.log("URI: ",uri);
      console.error("Database not connected");
      throw new Error("Database not connected");
    }
    return _db;
  },
};
