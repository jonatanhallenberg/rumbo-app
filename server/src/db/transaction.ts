import { query } from "./db";
import { Transaction, TransactionStatus } from "../types";
import { Schema, model } from 'mongoose'

// export type Transaction = {
//   id?: number,
//   email: string;
//   time: Date;
//   amount: number;
//   description: string;
//   sum?: number;
//   sourceReference?: string;
//   status?: TransactionStatus;
// };

export const schema = new Schema<Transaction>({
  // id: { type: Number },
  email: { type: String, required: true },
  time: { type: Date, required: true },
  description: { type: String, required: true },
  amount: {type: Number, required: true},
  sourceReference: {type: String},
  sum:{type: Number},
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 0
  }
})

export const TransactionModel = model<Transaction>('Transaction', schema);

type getTransactionFilter = {
  email?: string;
  year?: number;
  month?: number;
  description?: string;
};

export const getTransactions = async ({
  email,
  year,
  month,
  description,
}: getTransactionFilter) => {
  let params = [];
  if (email) {
    params.push(email);
  }
  if (year) {
    params.push(year);
  }
  if (month) {
    params.push(month);
  }
  if (description) {
    description = `%${description}%`;
    params.push(description);
  
  }
  return await TransactionModel.find({email: email})
};

export const getTransactionById = async (transactionId: string) => {
  // const sqlQuery = `SELECT * FROM public.transactions WHERE id = $1`;
  // const result = await query(sqlQuery, [transactionId]);
  // return result['length'] === 0 ? null : result[0];
  return await TransactionModel.find({"_id":transactionId})
};

export const deleteTransactionById = async (transactionId:string) => {
  // const sqlQuery = `DELETE FROM public.transactions WHERE id = $1`;
  // await query(sqlQuery, [transactionId]);
  return await TransactionModel.deleteOne({"_id":transactionId})
};

export const getTransactionsMeta = async (email: string) => {
  const res = await TransactionModel.aggregate([
    {$match: {'email': email}}, {$group: { _id:{year: {$year: "$time" }, month: {$month: "$time"}}}}
  ])
  return res.map(meta => ({year: Number(meta._id.year), month: Number(meta._id.month)}))
};

export const addTransaction = async (transaction: Transaction) =>{
    const newTransaction =  new TransactionModel(transaction);
    await newTransaction.save();
    return newTransaction;

};

export const filterOutExistingTransactions = async (transactions: Transaction[]): Promise<Transaction[]> => {
  if (transactions.length === 0) {
    return [];
  }
  const sqlQuery = `SELECT source_reference FROM "transactions" WHERE source_reference in (${transactions.map((transaction, index) => "$" + (index + 1)).join(", ")})`;
  const params = transactions.map(transaction => transaction.sourceReference);
  const existingTransactionSourceReferences = (await query(sqlQuery, params) as any[])
    .map(existingTransaction => existingTransaction.source_reference);
  return transactions.filter(transaction => existingTransactionSourceReferences.indexOf(transaction.sourceReference) === -1);
}