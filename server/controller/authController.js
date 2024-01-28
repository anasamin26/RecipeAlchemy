const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");
const dbo = require("../database/dbcon");
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');

module.exports.Signup = async (req, res) => {
  try {
    const { firstName, lastName,username, email, password, friends} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format", success: false });
    }

    const db_connect = await dbo.getDb();
    const existingUser = await db_connect.collection("Users").findOne({ email,username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    if (!db_connect) {
      console.error('Database connection not established');
      return res.status(500).json({ status: 500, success: false, message: 'Database connection not established' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = {
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      friends,
      createdAt: new Date().toISOString()
    };

    const insertResult = await db_connect.collection("Users").insertOne(user);

    const userId = insertResult.insertedId;

    const token = createSecretToken(userId);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // Respond with success
    res.status(201).json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format", success: false });
    }

    const db_connect = await dbo.getDb();
    const existingUser = await db_connect.collection("Users").findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password", success: false });
    }
    const token = createSecretToken(existingUser._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports.userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No Token found");
    return res.json({ status: false });
  }
  console.log("Token to verify ");

  try {
    const data = await jwt.verify(token, process.env.TOKEN_KEY);
    console.log("Token got in success ");

    const db_connect = await dbo.getDb();
    const user = await db_connect.collection("Users").findOne({ _id: new ObjectId(data.id) });

    if (user) {
      return res.json({ status: true, user: user });
    } else {
      return res.json({ status: false });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.json({ status: false });
  }
};


