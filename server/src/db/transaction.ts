import TransactionModel from './models/transaction';

import { Transaction, TransactionStatus } from "../types";

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
  if (description) {
    filterQuery.description = { $regex: description };
  }

  const transactions = await TransactionModel.find(filterQuery);
  return transactions;
};

export const getTransactionById = async (transactionId: string) => {
  const result = await TransactionModel.findById(transactionId);
  return result;
};

export const deleteTransactionById = async (transactionId: string) => {
  await TransactionModel.findByIdAndDelete(transactionId);
};

export const getTransactionsMeta = async (email: string) => {
  const res: any = await TransactionModel.aggregate([{ $match: { "email": email } }, { $group: { _id: { year: { $year: "$time" }, month: { $month: "$time" } } } }]).exec();
  return res.map(meta => ({ year: Number(meta._id.year), month: Number(meta._id.month) }));
};

export const addTransaction = async (transaction: Transaction) => {
  transaction.status = TransactionStatus.Final;
  const newTransaction = new TransactionModel(transaction);
  await newTransaction.save();

  return newTransaction;
};

export const filterOutExistingTransactions = async (transactions: Transaction[]): Promise<Transaction[]> => {
  if (transactions.length === 0) {
    return [];
  }

  const existingTransactionSourceReferences: string[] = await TransactionModel.find({ "sourceReference": { $in: transactions.map(transaction => transaction.sourceReference) } });
  return transactions.filter(transaction => existingTransactionSourceReferences.indexOf(transaction.sourceReference) === -1);
}