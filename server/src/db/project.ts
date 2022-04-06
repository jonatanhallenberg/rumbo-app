import { Schema, model } from 'mongoose'

interface Project {
    customer_name: string,
    project_name: string,
    agreement_ref: string,
    active: boolean,
    created_at: Date,
    employees: Array<string>
}

const schema = new Schema<Project>({
    customer_name: { type: String, required: true },
    project_name: { type: String, required: true },
    agreement_ref: { type: String, required: true },
    active: { type: Boolean, required: true },
    created_at: { type: Date, required: true },
    employees: { type: [String] }
})

const ProjectModel = model<Project>('Project', schema)


export const getProjects = async () => {
    const mongoQuery = ProjectModel.find()
    return await mongoQuery;
};









// postgreSQL

// import { query } from "./db";

// export const getProjects = async (
//     email?: string
// ) => {
//     let whereClause = '';
//     let params = [];
//     if (email) {
//         whereClause = `WHERE public.employees.email = $1`;
//         params = [ email ]
//     }

//     const sqlQuery = `SELECT public.projects.id, public.projects.project_name FROM public.projects`;
    
//     return query(sqlQuery, params);
// }