import React, { useState } from 'react';
import validator from 'validator';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Label } from '../../components/Label/Label';
import { Heading, variation } from '../../components/Heading/Heading';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

import { toasterInfo, toasterError } from '../../utils/showToaster';
import { SUCCESS, ERRORS } from '../../utils/messages';
import { formatNetworkErrorMessages } from '../../utils/format';
import { startLogin } from '../../redux/actions/authActions';

import { AppState } from '../../redux/configureStore';

export const SigninContainer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { hasErrors, message } = useSelector((state: AppState) => state.auth.error);
  const { isLoggedIn, user, isLoggingIn } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();
  let history = useHistory();

  React.useEffect(
    () => {
      if (hasErrors) {
        toasterError(`${ERRORS.signinFailed}: ${message}`);
        console.error('Signin error: ', message);
      }
      if (isLoggedIn && user) {
        toasterInfo(SUCCESS.signinSuccess);
        history.push('/expense/add');
      }
    },
    [hasErrors, message, isLoggedIn, user, history]
  );

  const isValidEmail = (validationEmail: string): boolean => validator.isEmail(email);
  const isValidPassword = (validationPassword: string): boolean => !validator.isEmpty(validationPassword);
  const onSubmitDispatch = (email: string, password: string) => {
    dispatch(startLogin(email, password));
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
          handleClick={() => onSubmitDispatch(email, password)}
          disabled={!isValidPassword(password) || !isValidEmail(email)}
          isLoading={isLoggingIn}
        />
        {hasErrors &&
          message &&
          <ErrorMessage data-testid="ErrorMessage">
            {formatNetworkErrorMessages(message)}
          </ErrorMessage>}
        <Label>
          Already have an account? <Link to="/signup">Sign up now.</Link>
        </Label>
      </Card>
    </div>
  );
};
