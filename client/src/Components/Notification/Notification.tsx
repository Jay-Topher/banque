import React from 'react';
import Icon from '../../Icomoon/icon';
// import { IAlertProps } from '../../react-app-env';
import './Notification.scss';

export default function Notification({ icon, children }: any) {
  return (
    <div className="alert__container">
      <Icon icon={icon} className="icon__style" />
      {children}
    </div>
    // <div className="alert__container">
    //   <Icon icon={icon} className="icon__style" />
    //   <div className="icon__text">{children}</div>
    // </div>
  );
}
