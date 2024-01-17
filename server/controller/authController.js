const User = require("../models/User");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");
const dbo = require("../database/dbcon");

module.exports.Signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format", success: false });
    }

    // Check if the user already exists
    const db_connect = await dbo.getDb();
    const existingUser = await db_connect.collection("Users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    if (!db_connect) {
      console.error('Database connection not established');
      return res.status(500).json({ status: 500, success: false, message: 'Database connection not established' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a user object
    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    // Insert the user into the database
    const insertResult = await db_connect.collection("Users").insertOne(user);

    // Retrieve the inserted user's ID
    const userId = insertResult.insertedId;

    // Create a token using the user's ID
    const token = createSecretToken(userId);

    // Set the token in a cookie
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

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password", success: false });
    }
    const token = createSecretToken(existingUser._id);

    // Set the token in a cookie
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });


    res.status(200).json({ message: "User signed in successfully", success: true, user: existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

