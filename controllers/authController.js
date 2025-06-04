import User from "../models/authModel.js";
import sendToken from "../utils/sendToken.js";
import bcrypt from "bcrypt"






export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

   

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

        sendToken(user, 200, res);

  

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};





export const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please Enter Email & Password"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Password does not match"
      });
    }

    user.password = undefined;


    
    sendToken(user, 200, res);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
}


export const logout = async (req, res) => {

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};



export const getUserDetails =
  async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    })
  }

