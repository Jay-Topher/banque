import {REGISTER_SUCCESS, USER_LOADED} from '../actions/types'
import { IAction } from '../../react-app-env';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  account: null,
  transactions: null,
  isAuthenticated: null,
  loading: true,
  error: null,
}

export default (state=initialState, action: IAction) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload?.token!)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload?.user,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload?.user,
        account: action.payload?.userAccount,
        transactions: action.payload?.userTransactions
      }

    default:
      return state;
  }
}
