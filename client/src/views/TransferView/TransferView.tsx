import React from 'react';
import './TransferView.scss';
import Card from '../../Components/Card/Card';
import { Link } from 'react-router-dom';
import FrequentTransfers from '../../Components/FrequentTransfers/FrequentTransfers';
import TransferHistory from '../../Components/TransferHistory/TransferHistory';

const TransferView = () => {
  return (
    <div className="transfer-view">
      <h2>Transfers</h2>
      <p>Send money</p>
      <div className="transfer-view-grid">
        <Card addClass="v-small new-transfer">
          <p className="card-heading">New Transfer</p>
          <Link to="/">New Transfer</Link>
        </Card>
        <FrequentTransfers />
        <TransferHistory />
      </div>
    </div>
  );
};

export default TransferView;
