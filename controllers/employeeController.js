import Employee from "../models/employeeModel.js";
import ApiFeatures from "../utils/apifeatures.js";

export const addEmployee = async (req, res) => {
    const { name, email, address, Department ,designation,phone} = req.body;

    try {
        const existingEmployee = await Employee.findOne({ email });

        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const user = await Employee.create({
            email,
            name, address, Department,phone,designation
        });

        res.status(200).json({
            success: true,
            message: "Employee Added Successfully",
            user

        })


    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during registration",
        });
    }
};


export const getAllEmployee= async (req, res) => {
  const employeeCount = await Employee.countDocuments();
    const query = req.query
    
    const resultPerPage =10;
    console.log("page result ", resultPerPage)
  try {

    const apifeatures=new ApiFeatures(Employee.find().sort({createdAt:-1}),req.query)
    .search().
    filter()
    .pagination(resultPerPage)

    const employee= await apifeatures.query;

    if (!employee || employee.length === 0) {
      return res.status(404).json({
        success: false,
        message: "employee Not Found",
      });
    }

    res.status(200).json({
      success: true,
      employeeCount,
      employee,
    });

  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({
      success: false,
      message: "Server Error while fetching employee",
    });
  }
};


export const updateEmployee = async (req, res) => {
  const { name, email, phone, address, Department,designation} = req.body;

  const employeeId = req.params.id;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee does not exist"
      });
    }

    const updatedData = {
      name,
      email,
      phone,     
      address,
      Department,
      designation,
      
    };

    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedData, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: "Employee Details updated successfully!",
      employee: updatedEmployee
    });

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating user"
    });
  }
};


export const deleteEmployee = async (req, res) => {
  const id = req.body
  console.log(id)
  const employee = await Employee.findById(req.params.id);
  console.log(employee)



  await employee.deleteOne();

  res.status(200).json({
    success: true,
    message: "Employee Deleted successfully",
  });

}

export const getEmployeeDetails = async (req, res, next) => {
  const id=req.params.id
  console.log(id)

    const employee = await Employee.findById(id);

    res.status(200).json({
      success: true,
      employee,
    })
  }

