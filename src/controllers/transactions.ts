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

/**
 * View all transactions
 * @returns {TransactionSchema[]} All Transactions
 */
export const viewTransactions = async () => {
  try {
    const transactions = await Transactions.find();

    if (!transactions) {
      throw Error('No transactions exist');
    }

    return transactions;
  } catch (err) {
    console.error('Could not get transactions');
    throw Error(err.message);
  }
};

/**
 * View all transactions by a user
 * @param userId - The ID of the user who's transactions you want to see
 * @returns - An array of transactions by the user.
 */
export const viewTransactionsByUser = async (userId: string) => {
  try {
    const transactions = await Transactions.find({ id: userId });

    if (!transactions) {
      throw Error('Transaction does not exist');
    }

    return transactions;
  } catch (err) {
    console.error('Could not get transactions');
    throw Error(err.message);
  }
};

