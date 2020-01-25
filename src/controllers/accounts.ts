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

export const createAccount = (userId: string) => {
  const newAccount = {
    user: userId,
    accountNumber: Number(`2${Math.random() * 1000000000}`),
    accountBalance: 0,
  };

  try {
    const account = new Accounts(newAccount);
    const saved = account.save();

    return saved;
  } catch (err) {
    console.error('Unable to save');
  }
};
