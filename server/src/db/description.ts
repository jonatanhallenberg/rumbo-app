import TransactionModel from './models/transaction';

export const getDescriptionsByEmail = async (email: string) => {
    return await TransactionModel.find({ email: email}).distinct('description');
};