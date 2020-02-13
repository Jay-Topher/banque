import React from 'react';
import './Main.scss';
import { IChildren } from '../../react-app-env';

const Main = ({ children }: IChildren) => {
  return <div className="main">{children}</div>;
};

export default Main;
