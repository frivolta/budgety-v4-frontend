import React from 'react';
import { useForm } from 'react-hook-form';
import {SignupSchema} from '../utils/Signup.schema'

import { Card } from '../components/Card/Card';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const LoginContainer: React.FC = () => {
  const { register, errors, handleSubmit} = useForm<FormData>({validationSchema: SignupSchema});

  const onSubmit = async (values: any) => {
    await console.log(values);
  };

  return (
    <div className="LoginContainer">
      <Card>
        <Input
          name="email"
          register={register}
          placeholder="E-mail"
          type="text"
          hasErrors={errors.email}
          errorMessage={errors.email?.message}
        />
        <Input
          name="password"
          register={register}
          placeholder="Password"
          type="password"
          hasErrors={errors.password}
          errorMessage={errors.password?.message}
        />
        <Input
          name="confirmPassword"
          register={register}
          placeholder="Confirm Password"
          type="password"
          hasErrors={errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />
        <Button text="Sign up" handleClick={handleSubmit(onSubmit)} />
      </Card>
    </div>
  );
};
