import TransactionModel from "./models/transaction";

export const getDescriptionsByEmail = async (email: string) => {
    return TransactionModel.find({ email: email }, {
        description: true,
        _id: false
    });
}

