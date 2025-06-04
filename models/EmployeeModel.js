import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
    },
    Department: {
        type: String,
        // enum: ["HR", "Finance", "IT", "Sales", "Support"],
        required: true,
    },
    address: {
        type: String,
    },
    designation: {
        type: String,
    },
},
     {
  timestamps: true
})


const Employee = mongoose.model("Employee",employeeSchema)

export default Employee;
