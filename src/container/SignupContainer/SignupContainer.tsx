import React from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startSignup } from "../../redux/actions/authActions";

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignupSchema } from "../../utils/Signup.schema";

import { Card } from "../../components/Card/Card";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Label } from "../../components/Label/Label";
import { Heading, variation } from "../../components/Heading/Heading";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

import { toasterInfo, toasterError } from "../../utils/showToaster";
import { SUCCESS, ERRORS } from "../../utils/messages";
import { formatNetworkErrorMessages } from "../../utils/format";

import { AppState } from "../../redux/configureStore";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignupContainer: React.FC = () => {
  const { register, errors, handleSubmit } = useForm<FormData>({ validationSchema: SignupSchema });
  const { isSigninUp, isLoggedIn } = useSelector((state: AppState) => state.auth);
  const { hasErrors, message } = useSelector((state: AppState) => state.auth.error);
  const dispatch = useDispatch();
  let history = useHistory();

  React.useEffect(() => {
    isLoggedIn && history.push("/");
  }, [isLoggedIn, history]);

  const onSubmit = (values: any) => {
    if (values?.email && values?.password) {
      dispatch(startSignup(values.email, values.password, history));
    }
  };

  return (
    <div className="SignupContainer" data-testid="SignupContainer">
      <Card>
        <Heading variation={variation.h1}>
          Fill out the form <br />
          and <span className="primary-color">Sign Up.</span>
        </Heading>
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

        <Button
          text="Sign up"
          handleClick={handleSubmit(onSubmit)}
          isLoading={isSigninUp}
          disabled={!!errors.email || !!errors.password || !!errors.confirmPassword}
        />
        {hasErrors && message && (
          <ErrorMessage data-testid="ErrorMessage">{formatNetworkErrorMessages(message)}</ErrorMessage>
        )}
        <Label>
          Already have an account? <Link to="/signin">Sign in.</Link>
        </Label>
      </Card>
    </div>
  );
};
