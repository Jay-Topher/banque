/// <reference types="react-scripts" />

import { AxiosRequestConfig } from 'axios';

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
