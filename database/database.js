import mongoose from "mongoose";


const connectDB = () => {
    mongoose.connect(process.env.DB_URI)
    .then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
        console.error("Database connection error: ", err);
    });
};

export default connectDB;
