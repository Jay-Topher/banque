import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/userActions';
import './RegisterForm.scss';
import { IState } from '../../react-app-env';

const RegisterForm = (props: any) => {
  useEffect(() => {
    if (props.isAuthenticated) {
      props.history.push('/user');
    }
  }, [props.isAuthenticated, props.history]);

  const { register } = props;
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bvn: '',
    password: '',
    confirmPassword: '',
    pin: '',
    confirmPin: '',
  };
  const [user, setUser] = useState(initialState);
  const [error, setError] = useState<string[]>([]);

  const {
    firstName,
    lastName,
    email,
    phone,
    bvn,
    password,
    confirmPassword,
    pin,
    confirmPin,
  } = user;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    return setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !pin ||
      !confirmPin ||
      !bvn ||
      !phone
    ) {
      setError([...error, 'All fields are required']);
      return;
    }
    // check password match
    if (user.password !== user.confirmPassword) {
      setError([...error, 'Passwords must match']);
      return;
    }
    // check pin match
    if (user.pin !== user.confirmPin) {
      setError([...error, 'PINs must match']);
      return;
    }
    const body = { firstName, lastName, email, bvn, password, pin, phone };

    register(body);

    return;
  };

  return (
    <>
      <form className="register" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={firstName}
          aria-label="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={lastName}
          aria-label="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="email"
          onChange={handleChange}
          value={email}
          aria-label="Email"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          value={phone}
          aria-label="Phone Number"
          required
        />
        <input
          type="text"
          name="bvn"
          placeholder="BVN"
          onChange={handleChange}
          value={bvn}
          aria-label="Bank Verification Number (BVN)"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={password}
          aria-label="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={confirmPassword}
          aria-label="Confirm Password"
          required
        />
        <input
          type="password"
          name="pin"
          placeholder="4 - Digit PIN"
          maxLength={4}
          pattern="[0-9]{4}"
          onChange={handleChange}
          value={pin}
          aria-label="4 - Digit Pin"
          required
        />
        <input
          type="password"
          name="confirmPin"
          placeholder="Confirm 4 - Digit PIN"
          maxLength={4}
          pattern="[0-9]{4}"
          onChange={handleChange}
          value={confirmPin}
          aria-label="Confirm 4 - Digit Pin"
          required
        />
        <input type="submit" value="Register" className="reg-btn" />
      </form>
      <div className="info">
        Already a member?{' '}
        <Link className="login2" to="/login">
          Login
        </Link>
      </div>
    </>
  );
};

const mapStateToProps = (state: IState) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, { register })(RegisterForm));
