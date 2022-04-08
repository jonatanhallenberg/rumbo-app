
import { Project } from "../app/slices/appSlice";

export const getProjectName = (projectId : string, projects : Project[]) => {

    const project = projects.find((project: Project) => projectId === project._id);

    if(project){
        return project.project_name
    }
    //else return null;

}
export const getProjectId = (projectName : any, projects : Project[]) => {
    // console.log(projects);
    // console.log(projectName)
    const project = projects.find(
        (project: Project) => project.project_name === projectName
      );

      if(project) {
        //   console.log('Projects', project._id);
          return project._id;
      }
      else return "";
}
