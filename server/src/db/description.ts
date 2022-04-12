import { query } from "./db";

// export const getDescriptionsByEmail = async (email: string) => {
//     const sqlQuery = `SELECT DISTINCT description FROM public.transactions WHERE email LIKE $1`;
//     return await query(sqlQuery, [ email ]);
// };

import TransactionModel from "./models/transaction";

export const getDescriptionsByEmail = async (email: string) => {
    return TransactionModel.find({ email: email }, {
        description: true,
        _id: false
    });
}

