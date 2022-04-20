import { Schema, model } from 'mongoose';

interface Employee {
    email: string,
    firstname: string,
    lastname: string,
    fullname?: string
}

const schema = new Schema<Employee>({
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fullname: { type: String, required: false },
}, { timestamps: true, id: true });

schema.set('toJSON', {
    virtuals: true
});

const EmployeeModel = model<Employee>('Employee', schema)

export default EmployeeModel;