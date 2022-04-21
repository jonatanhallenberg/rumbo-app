import { Schema, model } from 'mongoose';
import { TimeReport } from '../../types';

const schema = new Schema<TimeReport>({
    email: { type: String, required: true },
    time: { type: Date, required: true },
    description: { type: String, required: true },
    hours: { type: Number, required: false },
    project_id: { type: String, required: false },
}, { timestamps: true, id: true });

schema.set('toJSON', {
    virtuals: true
});


const TimeReportModel = model<TimeReport>('TimeReport', schema)

export default TimeReportModel;