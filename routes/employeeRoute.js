
import express from "express";



import {  authorizeRoles, isAuthenticateUser } from "../utils/auth.js";
import { addEmployee, deleteEmployee, getAllEmployee, getEmployeeDetails, updateEmployee } from "../controllers/employeeController.js";

const router = express.Router();



// ------------------- Routes -------------------

router.route("/add-employee").post(isAuthenticateUser,authorizeRoles("admin"),addEmployee);
router.route("/employee-details/:id").get(isAuthenticateUser,getEmployeeDetails);

router.route("/get-all-employee").get(getAllEmployee);
router.route("/update-employee/:id").put(isAuthenticateUser,updateEmployee);

router.route("/delete-employee/:id").delete(isAuthenticateUser,authorizeRoles("admin"),deleteEmployee);

export default router;
