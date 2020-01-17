import React from 'react';
import { Card } from '../components/Card/Card';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';

const errorMessages = {
  email: 'Email error',
  password: 'Password error',
  confirmPassword: 'Confirm password error'
};

export const LoginContainer: React.FC = () => {
  return (
    <div className="LoginContainer">
      <Card>
        <Input placeholder="E-mail" type="text" hasErrors={true} errorMessage={errorMessages.email} value="" />
        <Input
          placeholder="Password"
          type="password"
          hasErrors={false}
          errorMessage={errorMessages.password}
          value=""
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          hasErrors={false}
          errorMessage={errorMessages.confirmPassword}
          value=""
        />
        <Button text="Sign up" handleClick={() => console.log('clicked')} />
      </Card>
    </div>
  );
};
