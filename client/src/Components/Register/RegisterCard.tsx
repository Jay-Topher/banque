import React from 'react';
import './RegisterCard.scss';
import RegisterForm from './RegisterForm';
import Card from '../Card/Card';

const RegisterCard = () => {
  return (
    <div className="register-card">
      <h2>Welcome!</h2>
      <p>Sign up to continue..</p>
      <Card>
        <RegisterForm />
      </Card>
    </div>
  );
};

export default RegisterCard;
