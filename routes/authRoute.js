

import express from "express";

import {
 

  getUserDetails,
  login,
  logout,
  register,
 
} from "../controllers/authController.js";


import {  isAuthenticateUser } from "../utils/auth.js";

const router = express.Router();



// ------------------- Routes -------------------

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticateUser,logout);
router.route("/me").get(isAuthenticateUser,getUserDetails);



export default router;
