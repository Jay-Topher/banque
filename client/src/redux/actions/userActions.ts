import { REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR } from './types';
import axios from 'axios';
import { IRegister, IConfig } from '../../react-app-env';
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
    console.log('..', res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    return;
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// register user
export const register = (body: IRegister) => async (dispatch: Dispatch) => {
  const config: IConfig = {
    header: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.post('/api/v1/users', body, config);
    console.log(response.data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    loadUser();
    return;
  } catch (err) {
    console.error(err.message);
  }
};
