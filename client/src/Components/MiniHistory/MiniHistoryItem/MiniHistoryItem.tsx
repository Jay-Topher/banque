import React from 'react';
import './MiniHistoryItem.scss';
import { currencyFormat } from '../../../utils/helpers';
import { IMiniHistory } from '../../../react-app-env';

const MiniHistoryItem = ({ amount, description }: IMiniHistory) => {
  return (
    <div className="mini-history-item">
      <p className="amount">{currencyFormat(amount)}</p>
      <p className="description">TRF: {description}</p>
    </div>
  );
};

export default MiniHistoryItem;
