import { Schema, model } from 'mongoose';
import { Transaction } from '../../types';

const schema = new Schema<Transaction>({
    email: { type: String, required: true },
    time: { type: Date, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: Number, required: false },
    sourceReference: { type: String, required: false },

}, { timestamps: true, id: true });

schema.set('toJSON', {
    virtuals: true
});


const TransactionModel = model<Transaction>('Transaction', schema)

export default TransactionModel;