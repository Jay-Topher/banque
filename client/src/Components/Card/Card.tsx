import React from 'react';
import './Card.scss';

type MyProps = {
  children: string | JSX.Element;
  addClass?: string;
};

const Card = (props: MyProps) => {
  return (
    <div className={`custom-card ${props.addClass}`}>{props.children}</div>
  );
};

export default Card;
