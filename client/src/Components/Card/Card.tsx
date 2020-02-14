import React from 'react';
import './Card.scss';

type CardProps = {
  children: string | JSX.Element;
  size?: string;
};

const Card = (props: CardProps) => {
  return <div className={`custom-card ${props.size}`}>{props.children}</div>;
};

export default Card;
