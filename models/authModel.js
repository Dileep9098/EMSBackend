// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   PhoneNumber: {
//     type: String,
//   },
//   password: {
//     type: String,
//     select: true
//   },
//   role: {
//     type: String,
//     default: "user"
//   },
//   IsActive: {
//     type: Boolean,
//     default: true
//   },


// }
  // , {
  //   timestamps: true
  // });

// const User = mongoose.model("User", userSchema);

// export default User;


import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const authSchema = new mongoose.Schema({
 
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },



}, {
  timestamps: true
});


authSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model("User", authSchema);
export default User;
