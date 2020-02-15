import React from 'react';
import Card from '../Card/Card';
import LoginForm from './LoginForm';
import '../Register/RegisterCard.scss';

export default function LoginCard() {
  return (
    <div className="register-card">
      <h2>Welcome Back</h2>
      <p>Login to your account</p>
      <Card>
        <LoginForm />
      </Card>
    </div>
  );
}
