import { query } from "./db";
import { TimeReport } from "../types";

type getTimeReportFilter = {
    email?: string;
    year?: number;
    month?: number;
    project?: string;
};

// export const getTimeReport = async ({
//     email,
//     year,
//     month,
//     project,
// }: getTimeReportFilter) => {
//     let where = [];
//     let params = [];
//     if (email) {
//         params.push(email);
//         where.push(`email = $${params.length}`);
//     }
//     if (year) {
//         params.push(year);
//         where.push(`DATE_PART('year',"time") = $${params.length}`);
//     }
//     if (month) {
//         params.push(month);
//         where.push(`DATE_PART('month',"time") = $${params.length}`);
//     }
//     if (project) {
//         params.push(project);
//         where.push(`project_id = $${params.length}`);
//     }

//     const whereClause = !where.length ? "" : "WHERE " + where.join(" AND ");
//     const sqlQuery = `SELECT * FROM (SELECT id, email, time, description, hours, project_id FROM public.time_reports) AllTimeReports ${whereClause}`;
//     return query(sqlQuery, params).then(res => res as TimeReport[]);
// };

// export const getTimeReportById = async (timereportId: number) => {
//     const sqlQuery = `SELECT * FROM public.time_reports WHERE id = $1`;
//     const result = await query(sqlQuery, [timereportId]);
//     return result['length'] === 0 ? null : result[0];
// };

// export const deleteTimeReportById = async (timeReportId: number) => {
//     const sqlQuery = `DELETE FROM public.time_reports WHERE id = $1`;
//     await query(sqlQuery, [timeReportId]);
// };

// export const getTimeReportMeta = async (email: string) => {
//     const sqlQuery = `SELECT
//                         EXTRACT(year from time) as year,
//                         EXTRACT(month from time) as month
//                     FROM
//                         ((SELECT time FROM time_reports WHERE email = 
//                         $1)
//                         UNION (SELECT NOW() as time)) as nested
//                     GROUP BY EXTRACT(month from time), EXTRACT(year from time)
//                     ORDER BY year, month`;
//     const res: any = await query(sqlQuery, [email]);
//     return res.map(meta => ({ year: Number(meta.year), month: Number(meta.month) }));
// };

// // export const addTimeReport = (timeReport: TimeReport) => {

// //     return query(
// //         'INSERT INTO public.time_reports(email, "time", description, hours, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
// //         [
// //             timeReport.email,
// //             timeReport.time,
// //             timeReport.description,
// //             timeReport.hours,
// //             timeReport.project_id,
// //         ]
// //     );
// // };

// export const updateTimeReport = (timeReport: TimeReport) => {

//     return query(
//         'UPDATE public.time_reports SET email = $1, time = $2, description = $3, hours = $4, project_id = $5 WHERE id = $6 RETURNING *',
//         [
//             timeReport.email,
//             timeReport.time,
//             timeReport.description,
//             timeReport.hours,
//             timeReport.project_id,
//             timeReport.id,
//         ]
//     );
// };

import TimeReportModel, {TimeReportType} from "./models/timereport";

export const getTimeReport = async ({email,year,month,project}: getTimeReportFilter) => {
    let params = {};
    if (email) {
        params['email'] = email ;
    }
    if (year && !month) {
        params['time'] = {$gt: new Date(year, 0, 1), $lt: new Date(year+1, 0, 1)} 
    }
    if (month && year) {
        params['time'] = {$gt: new Date(year, month-1, 1), $lt: new Date(year, month, 1)}
    }
    if (project) {
        params['project'] = project;
    }
    const timereports = await TimeReportModel.find(params)
    console.log(timereports)
    return timereports
}


export const getTimeReportById = async (timereportId: any) => {
    const timereport = await TimeReportModel.findById(timereportId)
    return timereport
};

export const deleteTimeReportById = async (timeReportId: any) => {
    await TimeReportModel.findByIdAndDelete(timeReportId)
};

// export const getTimeReportMeta = async (email: string) => {
//     const timereports = await TimeReportModel.find({email: email})
//     const timereportMeta = timereports.map(timereport => ({year: timereport.time.getFullYear(), month: timereport.time.getMonth()+1}))
//     return timereportMeta
// };

export const getTimeReportMeta = async (email: string) => {
    const res = await TimeReportModel.aggregate([ {$match: {'email': email}},{ $group: { _id: { year: { $year: "$time" }, month: { $month: "$time" } } } }]).exec()
    return (await res).map(meta => ({ year: Number(meta._id.year), month: Number(meta._id.month) }) );
  }

export const addTimeReport = (timeReport: TimeReportType) => {
    const newTimeReport = new TimeReportModel(
        {
            email: timeReport.email,
            time: timeReport.time,
            description: timeReport.description,
            hours: timeReport.hours,
            project_id: timeReport.project_id,
        }
      );
      return newTimeReport.save().then((res) => [res]);
    }

export const updateTimeReport = (timeReport: TimeReportType) => {
    return TimeReportModel.findByIdAndUpdate(timeReport._id, {
        email: timeReport.email,
        time: timeReport.time,
        description: timeReport.description,
        hours: timeReport.hours,
        project_id: timeReport.project_id,
    }).then((res) => [res]);
}