import React from 'react';
import Icon from '../../../Icomoon/icon';
import { IDashCard } from '../../../react-app-env';
import { Link } from 'react-router-dom';

const DashCards = ({ addClass, icon, description, place }: IDashCard) => {
  return (
    <Link to={place} className={`dash-cards ${addClass}`}>
      <Icon icon={icon} className="photo" />
      <p className="desc">{description}</p>
    </Link>
  );
};

export default DashCards;
