import { loadUser } from './userActions';
import { TRANSFER_SUCCESS } from './types';
import axios from '../../axios';
import { IConfig, ITransferProp } from '../../react-app-env';

export function userTransferAction(
  body: ITransferProp,
  userID: string,
  userAccount: string,
) {
  return async (dispatch: any) => {
    const config: IConfig = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const transaction = await axios.patch(
        `/api/v1/users/${userID}/accounts/${userAccount}/transfer`,
        body,
        config,
      );
      dispatch({
        type: TRANSFER_SUCCESS,
        payload: transaction.data,
      });
      dispatch(loadUser());
    } catch (err) {
      console.error(err);
    }
  };
}
