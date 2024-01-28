const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const PORT = 8080;
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend origin
    credentials: true,
  })
);

app.use(require("./routes/recipeRoutes"));
app.use(require("./routes/authRoutes"));
app.use(require("./routes/postRoutes"));
const dbo = require("./database/dbcon");
app.listen(PORT, async () => {
  // perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${PORT}`);
});