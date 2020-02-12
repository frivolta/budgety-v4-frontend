import React, { useState } from 'react';
import gql from 'graphql-tag';
import validator from 'validator';
import { useHistory } from 'react-router-dom';

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
import { setUserId, asyncSetToken } from '../../utils/authentication/auth.utils';
import { formatNetworkErrorMessages } from '../../utils/format';

//<Button text="Sign up" handleClick={handleSubmit(onSubmit)} isLoading={mutationLoading} disabled={!!errors.email || !!errors.password || !!errors.confirmPassword}/>

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
  let history = useHistory();

  const isValidEmail = (validationEmail: string): boolean => validator.isEmail(email);
  const isValidPassword = (validationPassword: string): boolean => !validator.isEmpty(validationPassword);

  const onSubmit = async (email: string, password: string) => {
    try {
      const result = await login({ variables: { email: email, password: password } });
      await asyncSetToken(result.data.login.token);
      setUserId(result.data.login.user.id);
      toasterInfo(SUCCESS.signinSuccess);
      history.push('/expense/add');
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
            {formatNetworkErrorMessages(mutationError.message)}
          </ErrorMessage>}
        <Label>
          Already have an account? <Link to="/signup">Sign up now.</Link>
        </Label>
      </Card>
    </div>
  );
};
