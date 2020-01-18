import * as yup from 'yup';

export const SignupSchema = yup.object().shape({
  email: yup.string().email('Email not valid').required('Required'),
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/, 'Password not strong enough'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});
