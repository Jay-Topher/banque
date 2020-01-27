import Accounts from '../models/accounts';
import { iAccountSchema } from '../models/accounts';

// get account number given userId
/**
 * Get a user's account number
 * @param {string} userId - The ID of the account owner
 * @returns {iAccountSchema} - The owner's account number.
 */
export const getAccountNumber = async (
  userId: string,
): Promise<iAccountSchema> => {
  try {
    const accountNumber = await Accounts.findOne(
      { user: userId },
      'accountNumber',
    );

    if (!accountNumber) {
      throw Error('No such account');
    }

    return accountNumber;
  } catch (err) {
    console.error('no account', err.message);
    throw Error(err.message);
  }
};

/**
 * Creates a user account
 * @param {string} userId - The ID of the account owner
 * @returns {iAccountSchema} - The account created
 */
export const createAccount = async (
  userId: string,
): Promise<iAccountSchema> => {
  const newAccount = {
    user: userId,
    accountNumber: Number(`2${Math.trunc(Math.random() * 1000000000)}`),
    accountBalance: 0,
  };

  try {
    const account = new Accounts(newAccount);
    const saved = await account.save();

    return saved;
  } catch (err) {
    console.error('Unable to save');
    throw Error(err.message);
  }
};

/**
 * Credit a user's account
 * @param accountNumber - The account number you intend to credit
 * @param amount - The amount you wish to credit
 */
export const creditAccount = async (accountNumber: string, amount: string) => {
  const newAccountNumber = Number(accountNumber);
  const newAmount = Number(amount);

  if (Number.isNaN(newAccountNumber) || Number.isNaN(newAmount)) {
    throw Error('Invalid account number or amount');
  }

  try {
    const [account] = await Accounts.find({ accountNumber: newAccountNumber });

    if (!account) {
      throw Error('Account does not exist');
    }

    const updatedAccount = await Accounts.findByIdAndUpdate(
      { id: account._id },
      {
        accountBalance: account.accountBalance + newAmount,
      },
    );

    return updatedAccount;
  } catch (err) {
    throw Error(err.message);
  }
};

/**
 * Debit a user's account
 * @param accountNumber - The account number you intend to debit
 * @param amount - The amount you wish to remove
 */
export const debitAccount = async (accountNumber: string, amount: string) => {
  const newAccountNumber = Number(accountNumber);
  const newAmount = Number(amount);

  if (Number.isNaN(newAccountNumber) || Number.isNaN(newAmount)) {
    throw Error('Invalid account number or amount');
  }

  try {
    const [account] = await Accounts.find({ accountNumber: newAccountNumber });

    if (!account) {
      throw Error('Account does not exist');
    }

    if (account.accountBalance < newAmount) {
      throw Error('Insufficient Funds');
    }

    const updatedAccount = await Accounts.findByIdAndUpdate(
      { id: account._id },
      {
        accountBalance: account.accountBalance - newAmount,
      },
    );

    return updatedAccount;
  } catch (err) {
    throw Error(err.message);
  }
};

// view all accounts
export const viewAllAccounts = async () => {
  try {
    const accounts = await Accounts.find();

    return accounts;
  } catch (err) {
    throw Error(err.message);
  }
};

// view all account by a user
export const viewAllAccountsByUser = async (userId: string) => {
  try {
    const accounts = await Accounts.find({ user: userId });

    if (!accounts) {
      throw Error('No accounts found');
    }

    return accounts;
  } catch (err) {
    throw Error(err.message);
  }
};

// view a user's account
export const viewAnAccount = async (accountId: string) => {
  try {
    const account = await Accounts.findById({ id: accountId });

    if (!account) {
      throw Error('Account not found');
    }

    return account;
  } catch (err) {
    throw Error(err.message);
  }
};
