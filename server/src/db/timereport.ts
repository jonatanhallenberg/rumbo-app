import { Schema, model } from 'mongoose'
import { TimeReport} from "../types";

// interface Project {
//     email: string,
//     time: Date,
//     hours: int,
//     project: boolean,
//     created_at: Date,
//     employees: Array<string>
// }

const schema = new Schema<TimeReport>({
    // id: { type: Number },
    email: { type: String, required: true },
    time: { type: Date, required: true },
    description: { type: String, required: true },
    hours: { type: Number, required: true },
    project_id: { type: String, required: true }
})

const TimeReportModel = model<TimeReport>('TimeReport', schema)


export const getTimeReport = async () => {
    const mongoQuery = TimeReportModel.find()
    return await mongoQuery;
};


// import { query } from "./db";



type getTimeReportFilter = {
    email?: string;
    year?: number;
    month?: number;
    project?: string;
};

export const getTimeReportsByFilter = async ({
    email,
    year,
    month,
    project,
}: getTimeReportFilter) => {
    //let where = [];
    let params = [];
    if (email) {
        params.push(email);
        //where.push(`email = $${params.length}`);
    }
    if (year) {
        params.push(year);
        //where.push(`DATE_PART('year',"time") = $${params.length}`);
    }
    if (month) {
        params.push(month);
        //where.push(`DATE_PART('month',"time") = $${params.length}`);
    }
    if (project) {
        params.push(project);
        //where.push(`project_id = $${params.length}`);
    }
    //const queryParameters = [`time = ${year}-${month}`]
    const newDate = new Date(year, month, 1)
    return await TimeReportModel.find({email: email});
    //const whereClause = !where.length ? "" : "WHERE " + where.join(" AND ");
    //const sqlQuery = `SELECT * FROM (SELECT id, email, time, description, hours, project_id FROM public.time_reports) AllTimeReports ${whereClause}`;
    //return query(sqlQuery, params).then(res => res as TimeReport[]);
};

export const getTimeReportById = async (timereportId: string) => {
    return await TimeReportModel.find({_id:timereportId});
}
export const deleteTimeReportById = async (timeReportId: string) =>{
    return await TimeReportModel.deleteOne({_id: timeReportId});
}
// export const getTimeReportMeta = async (email: string) => {

// }

export const getTimeReportMeta = async (email: string) => {
    const res = await TimeReportModel.aggregate([ {$match: {'email': email}}, {$group: { _id: {year: {$year: "$time" }, month: {$month: "$time"}}}}])
    return res.map(meta => ({year: Number(meta._id.year), month: Number(meta._id.month)}))
}

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

export const addTimeReport = async (timeReport: TimeReport) => {
    const newTimeReport =  new TimeReportModel(timeReport);
    await newTimeReport.save();
    return newTimeReport;
}

export const updateTimeReport = async (id:string, timeReport: TimeReport) => {
    return await TimeReportModel.findByIdAndUpdate({_id:id}, {$set:timeReport});
}