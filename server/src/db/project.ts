import ProjectModel from './models/project';

export const getProjects = async (
    email?: string
) => {
    return await ProjectModel.find();
}