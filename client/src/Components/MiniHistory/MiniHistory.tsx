import React from 'react';
import './MiniHistory.scss';
import MiniHistoryItem from './MiniHistoryItem/MiniHistoryItem';

const MiniHistory = () => {
  return (
    <div className="mini-history">
      <MiniHistoryItem amount={1} description="Hello" />
      <MiniHistoryItem amount={1} description="Hello" />
      <MiniHistoryItem amount={1} description="Hello" />
      <MiniHistoryItem amount={1} description="Hello" />
      <MiniHistoryItem amount={1} description="Hello" />
      <MiniHistoryItem amount={1} description="Hello" />
    </div>
  );
};

export default MiniHistory;
