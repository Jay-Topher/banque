import React from 'react';
import './Usernav.scss';
import { IState } from '../../react-app-env';
import { connect } from 'react-redux';

const Usernav = ({
  firstName,
  lastName,
}: {
  firstName?: string;
  lastName?: string;
}) => {
  return (
    <nav className="usernav">
      <div className="name">
        <p>
          Welcome, {firstName} {lastName}
        </p>
      </div>
      <div className="logout">Logout</div>
    </nav>
  );
};

const mapStateToProps = (state: IState) => ({
  firstName: state.user.user!.firstName,
  lastName: state.user.user!.lastName,
});

export default connect(mapStateToProps)(Usernav);
