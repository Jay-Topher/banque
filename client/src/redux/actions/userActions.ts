import { IRegister, IConfig, ILogin } from '../../react-app-env';
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  AUTH_SUCCESS,
} from './types';
import axios from '../../axios';
import { Dispatch } from 'redux';
import setAuthToken from '../../utils/setAuthToken';

// load user
const loadUser = () => async (dispatch: Dispatch) => {
  // @todo -load token into global headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/v1/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    return;
  } catch (err) {
    console.error(err.response.responseText);
    dispatch({ type: AUTH_ERROR });
  }
};

// register user
export const register = (body: IRegister) => async (dispatch: any) => {
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

    dispatch(loadUser());
    return;
  } catch (err) {
    console.error(err.message);
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
