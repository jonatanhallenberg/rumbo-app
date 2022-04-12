import EmployeeModel from "./models/employee";

export const getEmployees = async () => {
    return EmployeeModel.find()
}