import React, { useState } from 'react';
import './TransferForm.scss';
import Button from '../../Components/Button/Button';
import { styleButton } from '../../Components/Login/style';
import { userTransferAction } from '../../redux/actions/transferActions';
import { useSelector, useDispatch } from 'react-redux';

const TransferForm = () => {
  const dispatch = useDispatch();
  const selectedData = useSelector((state: any) => state.user);
  const userAccount = selectedData.account.accountNumber;
  const userID = selectedData.user._id;

  const initialState = {
    amount: 0,
    accountNumber: '',
    description: '',
    pin: '',
  };
  const [userTransaction, setUserTransaction] = useState(initialState);

  const { amount, accountNumber, description, pin } = userTransaction;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    return setUserTransaction({
      ...userTransaction,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount || !accountNumber || !pin) {
      alert('No Way!!!');
      return;
    }
    const data = { amount, accountNumber, description, pin };
    dispatch(userTransferAction(data, userID, userAccount));
    return;
  };
  return (
    <>
      <form className="transfer" onSubmit={handleSubmit}>
        <input
          type="text"
          name="amount"
          className="transfer-amount"
          placeholder="Amount"
          aria-label="amount"
          onChange={handleChange}
          value={amount}
        />
        <input
          type="text"
          name="accountNumber"
          className="transfer-account"
          placeholder="Account Number"
          aria-label="account number"
          onChange={handleChange}
          value={accountNumber}
        />
        <input
          type="text"
          name="description"
          className="description"
          placeholder="Description"
          aria-label="description"
          onChange={handleChange}
          value={description}
        />
        <input
          type="text"
          name="pin"
          className="pin"
          placeholder="Transaction Pin"
          aria-label="transaction pin"
          onChange={handleChange}
          value={pin}
        />
        <Button buttonName="Transfer" styleButton={styleButton} />
      </form>
    </>
  );
};

export default TransferForm;
