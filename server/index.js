const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const PORT = 8080;
app.use(cors());
app.use(express.json());
app.use(require("./routes/recipeRoutes"));
app.use(require("./routes/authRoutes"));
const dbo = require("./database/dbcon");

app.listen(PORT, async () => {
  // perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${PORT}`);
});