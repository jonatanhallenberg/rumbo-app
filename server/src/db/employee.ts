import EmployeeModel from './models/employee';

export const getEmployees = async () => {
    const employees = await EmployeeModel.find();
    return employees;
};