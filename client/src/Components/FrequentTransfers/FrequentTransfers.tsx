import React from 'react';
import './FrequentTransfers.scss';
import Card from '../Card/Card';

const FrequentTransfers = () => {
  return (
    <Card addClass="v-small frequent-transfers">
      <p className="card-heading">Frequent Transfers</p>
      <p className="body">Show frequent transfers here</p>
    </Card>
  );
};

export default FrequentTransfers;
