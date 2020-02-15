import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../react-app-env';

const PrivateRoute = ({
  isAuthenticated,
  loading,
  component: Component,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && loading ? (
          <Redirect to="/register" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state: IState) => ({
  isAuthenticated: state.user.isAuthenticated,
  loading: state.user.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
