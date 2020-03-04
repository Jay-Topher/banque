import React from 'react';
import './MiniHistory.scss';
import MiniHistoryItem from './MiniHistoryItem/MiniHistoryItem';
import { IMiniHistoryProp } from '../../react-app-env';

const MiniHistory = ({ transactions }: IMiniHistoryProp) => {
  return (
    <div className="mini-history">
      {transactions &&
        transactions.map(transaction => (
          <MiniHistoryItem
            amount={transaction.transactionAmount}
            description={transaction.description}
          />
        ))}
    </div>
  );
};

export default MiniHistory;
