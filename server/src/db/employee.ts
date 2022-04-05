import { Schema, model } from 'mongoose'

interface Employee {
    email: string,
    firstname: string,
    lastname: string,
    fullname: string,
    projects: Array<string>,
    time_reports: Array<string>,
    transactions: Array<string>
}

const schema = new Schema<Employee>({
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fullname: { type: String, required: true },
    projects: { type: [String] },
    time_reports: { type: [String] },
    transactions: { type: [String] }
})

const EmployeeModel = model<Employee>('Employee', schema)

export default EmployeeModel

export const getEmployees = async () => {
    const mongoQuery = EmployeeModel.find()
    return await mongoQuery;
};












// postgreSQL
// import { query } from "./db";

// export const getEmployees = async () => {
//     const sqlQuery = `SELECT * FROM public.employees`;
//     return await query(sqlQuery);
// };