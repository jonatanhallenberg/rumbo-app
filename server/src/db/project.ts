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