/// <reference types="react-scripts" />

import { AxiosRequestConfig } from 'axios';
import { Action } from 'redux';
import { Props, ComponentType } from 'react';

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bvn: string;
  password: string;
  pin: string;
}

export interface IConfig extends AxiosRequestConfig {
  header: {
    'Content-Type': string;
  };
}

export interface IAction extends Action {
  payload?: {
    token?: string;
    user?: object;
    userAccount?: object;
    userTransactions?: object[];
  };
}

export interface IMenuProp {
  icon: string;
  title: string;
  place: string;
}
