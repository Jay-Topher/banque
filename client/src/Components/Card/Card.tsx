import React from 'react';
import './Card.scss';

type MyProps = {
  children: string | JSX.Element;
  size?: string;
};

const Card = (props: MyProps) => {
  return <div className={`custom-card ${props.size}`}>{props.children}</div>;
};

export default Card;
