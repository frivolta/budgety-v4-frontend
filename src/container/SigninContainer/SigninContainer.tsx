import React, { useState } from 'react';
import gql from 'graphql-tag';
import validator from 'validator';

import { Link } from 'react-router-dom';

import { useMutation } from 'react-apollo';

import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Label } from '../../components/Label/Label';
import { Heading, variation } from '../../components/Heading/Heading';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

import { toasterInfo, toasterError } from '../../utils/showToaster';
import { SUCCESS, ERRORS } from '../../utils/messages';

//<Button text="Sign up" handleClick={handleSubmit(onSubmit)} isLoading={mutationLoading} disabled={!!errors.email || !!errors.password || !!errors.confirmPassword}/>
type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const SIGNIN_MUTATION = gql`
  mutation SigninMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

export const SigninContainer: React.FC = () => {
  const [login, { loading: mutationLoading, error: mutationError }] = useMutation(SIGNIN_MUTATION);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (validationEmail: string): boolean => validator.isEmail(email);
  const isValidPassword = (validationPassword: string): boolean => !validator.isEmpty(validationPassword);

  const onSubmit = async (email: string, password: string) => {
    try {
      const result = await login({ variables: { email: email, password: password } });
      // @ToDo: Set user to localStorage using custom hooks
      console.log(result);
      toasterInfo(SUCCESS.signinSuccess);
    } catch (err) {
      await toasterError(ERRORS.signinFailed);
      console.error('Signin error: ', err);
    }
  };

  return (
    <div className="SignupContainer" data-testid="SignupContainer">
      <Card>
        <Heading variation={variation.h1}>
          Use your credentials <br />and <span className="primary-color">Login.</span>
        </Heading>
        <Input
          name="email"
          placeholder="E-mail"
          type="text"
          value={email}
          handleChange={e => setEmail(e.target.value)}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          handleChange={e => setPassword(e.target.value)}
        />

        <Button
          text="Login"
          handleClick={() => onSubmit(email, password)}
          disabled={!isValidPassword(password) || !isValidEmail(email)}
          isLoading={mutationLoading}
        />
        {mutationError &&
          <ErrorMessage data-testid="ErrorMessage">
            {mutationError.message}
          </ErrorMessage>}
        <Label>
          Already have an account? <Link to="/signup">Sign up now.</Link>
        </Label>
      </Card>
    </div>
  );
};
