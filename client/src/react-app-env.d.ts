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

export interface ILogin {
  email: string;
  password: string;
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
    error?: string;
  };
}

export interface IMenuProp {
  icon: string;
  title: string;
  place: string;
}

export interface IUsernavProp {
  name: string;
}

export interface IChildren {
  children: JSX.Element[] | JSX.Element;
}

export interface IDashCard {
  description: string;
  icon: string;
  addClass: string;
  place: string;
}

export interface IUserDetails {
  accountBalance: number;
  accountName: string;
  accountNumber: string;
}

export interface IMiniHistory {
  amount: number;
  description: string;
}
