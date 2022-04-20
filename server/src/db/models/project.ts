import { Schema, model } from 'mongoose';
import { Transaction } from '../../types';

interface Project {
    id: string
    customer_name: string,
    project_name: string,
    agreement_ref: string,
    active: boolean
}

const schema = new Schema<Project>({
    customer_name: { type: String, required: true },
    project_name: { type: String, required: true },
    agreement_ref: { type: String, required: true },
    active: { type: Boolean, required: true },

}, { timestamps: true, id: true });

schema.set('toJSON', {
    virtuals: true
});


const ProjectModel = model<Project>('Project', schema)

export default ProjectModel;