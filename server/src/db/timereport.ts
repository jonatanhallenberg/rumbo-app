import { query } from "./db";
import { TimeReport } from "../types";
import TimeReportModel from "./models/timereport";

type getTimeReportFilter = {
    email?: string;
    year?: number;
    month?: number;
    project?: string;
};

export const getTimeReport = async ({
    email,
    year,
    month,
    project,
}: getTimeReportFilter) => {
    const filterQuery: any = { status: 0 };

    if (email) {
        filterQuery.email = email;
    }
    if (year && !month) {
        filterQuery.time = { $gt: new Date(year, 0, 1), $lt: new Date(Number(year) + 1, 0, 1) }
    }
    if (month && year) {
        filterQuery.time = { $gt: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) }
    }
    if (project) {
        filterQuery.project_id = project;
    }
    const timeReports = await TimeReportModel.find(filterQuery);
    return timeReports;
};

export const getTimeReportById = async (timereportId: string) => {
    const result = await TimeReportModel.findById(timereportId);
    return result;
};

export const deleteTimeReportById = async (timeReportId: string) => {
    await TimeReportModel.findByIdAndDelete(timeReportId);
};

export const getTimeReportMeta = async (email: string) => {
    const res: any = await TimeReportModel.aggregate([{ $match: { "email": email } }, { $group: { _id: { year: { $year: "$time" }, month: { $month: "$time" } } } }]).exec();
    return res.map(meta => ({ year: Number(meta._id.year), month: Number(meta._id.month) }));
};

export const addTimeReport = async (timeReport: TimeReport) => {
    const newTimeReport = new TimeReportModel(timeReport);
    await newTimeReport.save();
    return newTimeReport;
};

export const updateTimeReport = async (timeReport: TimeReport) => {
    await TimeReportModel.findByIdAndUpdate(timeReport.id, timeReport);
};