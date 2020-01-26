import Accounts from '../models/accounts';

// export const transferToAccount = async (
//   accountNumber: number,
//   amount: number,
//   description: string,
// ) => {
//   if (!accountNumber || !amount || !description) {
//     throw Error('Incomplete Parameters');
//   }

//   try {
//     const account = await AccountSchema.find({ accountNumber: accountNumber });
//     if (!account) {
//       throw Error('Account does not exist');
//     }

//   } catch (err) {}
// };

export const createAccount = async (userId: string) => {
  const newAccount = {
    user: userId,
    accountNumber: Number(`2${Math.random() * 1000000000}`),
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

export const creditAccount = async (accountNumber: string, amount: string) => {
  const newAccountNumber = Number(accountNumber);
  const newAmount = Number(amount);

  if (Number.isNaN(newAccountNumber) || Number.isNaN(newAmount)) {
    throw Error('Invalid account number or amount');
  }

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
};
