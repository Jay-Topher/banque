import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.scss';
import Button from '../Button/Button';
import { styleButton } from './style';
import { connect } from 'react-redux';
import { authLogin } from '../../redux/actions/userActions';

function LoginForm(props: any) {
  const { authLogin } = props;
  const initialState = {
    email: '',
    password: '',
  };

  const [user, setUser] = useState(initialState);
  const [error, setError] = useState<string[]>([]);

  const { email, password } = user;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    return setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError([...error, 'All fields are required']);
      return;
    }

    const body = { email, password };
    authLogin(body);
    return;
  };
  return (
    <>
      <form className="register" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
          aria-label="Email"
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
          autoComplete="off"
        />
        <Button buttonName="Login" styleButton={styleButton} />
      </form>
      <div className="info">
        Don't have an account?{' '}
        <Link className="login" to="/register">
          Register
        </Link>
      </div>
    </>
  );
}
export default connect(
  null,
  { authLogin },
)(LoginForm);
