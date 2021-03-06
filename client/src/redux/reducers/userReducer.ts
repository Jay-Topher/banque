import { TRANSFER_FAIL } from './../actions/types';
import { IUserState } from './../../react-app-env.d';
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  TRANSFER_START,
  TRANSFER_SUCCESS,
} from '../actions/types';
import { IAction } from '../../react-app-env';

const initialState: IUserState = {
  token: localStorage.getItem('token'),
  user: null,
  account: null,
  transactions: null,
  isAuthenticated: null,
  loading: true,
  error: null,
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case AUTH_SUCCESS:
      localStorage.setItem('token', action.payload!.token!);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload!.user,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload!.user,
        account: action.payload!.userAccount,
        transactions: action.payload!.userTransactions,
      };
    case AUTH_START:
      return {
        ...state,
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: action.payload!.error,
      };
    case TRANSFER_START:
      return {
        ...state,
      };
    case TRANSFER_SUCCESS:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case TRANSFER_FAIL:
      return {
        ...state,
        error: action.payload?.error,
      };
    default:
      return state;
  }
};
