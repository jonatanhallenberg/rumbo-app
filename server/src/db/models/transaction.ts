import { Schema, model } from 'mongoose';
export interface TransactionType {
    email: string;
    time: Date;
    amount: number;
    description: string;
    sum?: number
    source_reference?: string;
    status?: TransactionStatusType;
}
export enum TransactionStatusType {
    Final,
    Preliminary,
    Rejected
}

const schema = new Schema<TransactionType>({
    email: {type: String, required: true},
    time: {type: Date, required: true},
    amount: {type: Number, required: true},
    description: {type: String, required: true},
    sum: {type: Number},
    source_reference: {type: String},
    status: {type: Number}, 
}, {timestamps: true, id: true});

schema.set('toJSON', {
    virtuals: true
});


const TransactionModel = model<TransactionType>('transaction', schema);
export default TransactionModel;
