import Transactions, { TransactionSchema } from '../models/transactions';

/**
 * Create a new transaction
 * @param {TransactionSchema} body - The transaction payload
 */
export const addTransaction = async (body: TransactionSchema) => {
  try {
    const transaction = new Transactions(body);
    const saved = await transaction.save();

    return saved;
  } catch (err) {
    console.error('Could not add transaction');
    throw Error(err.message);
  }
};

