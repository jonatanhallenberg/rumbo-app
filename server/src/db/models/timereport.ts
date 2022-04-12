import { Schema, model } from 'mongoose';
export interface TimeReportType {
    _id?: string;
    email: string;
    time: Date;
    hours: number;
    description: string;
    project_id: String;
}

const schema = new Schema<TimeReportType>({
    email: {type: String, required: true},
    time: {type: Date, required: true},
    hours: {type: Number, required: true},
    description: {type: String, required: true},
    project_id: {type: String, required: true}
}, {timestamps: true, id: true});

schema.set('toJSON', {
    virtuals: true
});

const TimeReportModel = model<TimeReportType>('timereport', schema);

export default TimeReportModel