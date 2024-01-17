const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const UserSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Your First Name  is required"],
    },
    lastName: {
        type: String,
        required: [true, "Your Last Name is required"],
    },
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

module.exports = mongoose.model("User", UserSchema);
