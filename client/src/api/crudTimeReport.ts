
import { TimeReport } from "../types";

export const getTimeReportsByUser = (jwtToken: string, email: string, year?: number, month?: number) => {
    let queries = [];
    if (year) {
        queries.push(`year=${year}`);
    }
    if (month) {
        queries.push(`month=${month}`);
    }
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${email}/timereport${queries.length ? "?" + queries.join("&") : ""}`, { headers: { authorization: `bearer ${jwtToken}` },
    }).then((res: any) => res.json());
};

export const getTimeReportsByProject = (jwtToken: string, year?: number, id?:string , month?: number) => {
    
    let queries = [];
    if (year) {
        queries.push(`year=${year}`);
    }
    if (month) {
        queries.push(`month=${month}`);
    }
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/project/${id}/timereport${queries.length ? "?" + queries.join("&") : ""}`, {
        headers: { authorization: `bearer ${jwtToken}` },
    }).then((res: any) => res.json());
};

export const getTimeReportsMeta = (jwtToken: string, email: string) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${email}/timereportmeta`, {
        headers: { authorization: `bearer ${jwtToken}` },
    }).then((res: any) => res.json());
};

export const postTimeReport = (jwtToken: string,
    timeReport: TimeReport) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/timeReport`, {
        method: 'POST',
        body: JSON.stringify(timeReport),
        headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
    }).then((res: any) => res.json());
};

export const updateTimeReport = (jwtToken: string, timeReport: any) => {
    let email : any;
    let id : any;
    if('_doc' in timeReport && '_id' in timeReport._doc){
        id = timeReport._doc._id;
    }
    else{
        id = timeReport._id;
    }
    if('_doc' in timeReport && 'email' in timeReport._doc){
        email = timeReport._doc.email;
    }
    else{
        email = timeReport.email;
    }
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/${email}/timereport/${id}`, {
        method: 'PUT',
        body: JSON.stringify(timeReport),
        headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
    }).then((res: any) => res.json());
};

export const deleteTimeReport = (jwtToken: string, timeReport: any) => {
    let email : any;
    let id : any;
    if('_doc' in timeReport && '_id' in timeReport._doc){
        id = timeReport._doc._id;
    }
    else{
        id = timeReport._id;
    }
    if('_doc' in timeReport && 'email' in timeReport._doc){
        email = timeReport._doc.email;
    }
    else{
        email = timeReport.email;
    }
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/${email}/timereport/${id}`, {
        method: 'DELETE',
        headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
    }).then((res: any) => res.json());
};

// let temp : any;
//     let tempDescription : any;
//     let tempTime : any;
//     if('_doc' in timereport && 'project_id' in timereport._doc){
//         temp = timereport._doc.project_id;
//         console.log(temp);
//     }
//     else{
//         temp = timereport.project_id;
//     }
//     if('_doc' in timereport && 'description' in timereport._doc){
//         tempDescription = timereport._doc.description;
//         console.log(tempDescription);
//     }
//     else{
//         tempDescription = timereport.description;
//     }
//     if('_doc' in timereport && 'time' in timereport._doc){
//         tempTime = timereport._doc.time;
//     }
//     else{
//         tempTime = timereport.time;
//     }