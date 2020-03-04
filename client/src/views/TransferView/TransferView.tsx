import React from 'react';
import './TransferView.scss';
import Card from '../../Components/Card/Card';
import { Link } from 'react-router-dom';
import FrequentTransfers from '../../Components/FrequentTransfers/FrequentTransfers';
import TransferHistory from '../../Components/TransferHistory/TransferHistory';
import Icon from '../../Icomoon/icon';
import { useSelector } from 'react-redux';
import { IUserState, IState } from '../../react-app-env';

const TransferView = () => {
  const transferData = useSelector((state: IState) => state.user.transactions);
  // console.log(transferData)
  return (
    <div className="transfer-view">
      <h2>Transfers</h2>
      <p>Send money</p>
      <div className="transfer-view-grid">
        <Card addClass="v-small new-transfer">
          <p className="card-heading">New Transfer</p>
          <Link to="/">
            <div>
              <Icon icon="wallet, money" className="icon"></Icon>
              <span>New Transfer</span>
            </div>
          </Link>
        </Card>
        <FrequentTransfers />
        <TransferHistory transactionHistory={transferData} />
      </div>
    </div>
  );
};

export default TransferView;
