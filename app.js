import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit"; 

import user from "./routes/authRoute.js"
import employee from "./routes/employeeRoute.js"
import path from "path"
dotenv.config();

const app = express();

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});


app.use(generalLimiter); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// const _dirname=path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
  credentials: true,
  origin: 'https://ems-frontend-git-main-dileeps-projects-853f5e81.vercel.app/', 
}));



app.use("/api/v1", user); 
app.use("/api/v1", employee); 


// app.use(express.static(path.join(_dirname,"/frontend/dist")))
// app.get("*",(req,res)=>{
//   res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
// })

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

export default app;
