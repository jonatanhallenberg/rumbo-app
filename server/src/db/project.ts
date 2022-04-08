import { query } from "./db";

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
import ProjectModel from "./models/project";
export const getProjects = async (email?: string) => {
    let whereClause;
    let params = [];
    if (email) {
        params = [ email ]
        whereClause = await ProjectModel.find({ email: params[0] })
    }
    
    return ProjectModel.find({}, {
        customer_name: false,
        agreement_ref: false,
        active: false,
        created_at: false
    });
}