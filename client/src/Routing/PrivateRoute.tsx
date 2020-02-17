import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../react-app-env';

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state: IState) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
