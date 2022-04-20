import { Schema, model } from 'mongoose';
import { Setting } from '../../types';

const schema = new Schema<Setting>({
    key: { type: String, required: true },
    value: { type: String, required: true }

}, { timestamps: true, id: true });

schema.set('toJSON', {
    virtuals: true
});


const SettingModel = model<Setting>('Setting', schema)

export default SettingModel;