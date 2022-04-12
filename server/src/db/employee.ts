// import { query } from "./db";

// export const getEmployees = async () => {
//     const sqlQuery = `SELECT * FROM public.employees`;
//     return await query(sqlQuery);
// };

import EmployeeModel from "./models/employee";

export const getEmployees = async () => {
    return EmployeeModel.find()
}