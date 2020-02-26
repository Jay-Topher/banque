import React from 'react';
import './FeedBackCard.scss';
import Card from '../Card/Card';

const FeedBackCard = ({
  comment,
  avi,
  name,
}: {
  comment: string;
  avi: string;
  name: string;
}) => {
  return (
    <Card addClass="feedback-card small">
      <div className="comment">{comment}</div>
      <div className="footer">
        <span className="avi">
          <img src={avi} alt={name} />
        </span>
        <p>{name}</p>
      </div>
    </Card>
  );
};

export default FeedBackCard;
