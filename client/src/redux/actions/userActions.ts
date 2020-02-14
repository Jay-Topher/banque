import { ILogin } from './../../react-app-env.d';
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  AUTH_SUCCESS,
} from './types';
import axios from 'axios';
import { IRegister, IConfig } from '../../react-app-env';
import { Dispatch } from 'redux';

// register user
export const register = (body: IRegister) => async (dispatch: Dispatch) => {
  const config: IConfig = {
    header: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.post('/api/v1/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    loadUser();
  } catch (err) {
    console.error(err.message);
  }
};

// load user
const loadUser = () => async (dispatch: Dispatch) => {
  // @todo -load token into global headers

  try {
    const res = await axios.get('/api/v1/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//Authorize and login user
export function authLogin(body: ILogin) {
  return async (dispatch: any) => {
    const config: IConfig = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post('/api/v1/auth', body, config);
      console.log(response.data);
      dispatch({
        type: AUTH_SUCCESS,
        payload: response.data,
      });

      dispatch(loadUser());
    } catch (err) {
      console.error(err);
    }
  };
}
