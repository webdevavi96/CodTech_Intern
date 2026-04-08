import { lazy } from 'react';

const Landing = lazy(() => import('./Landing'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const OTPVerify = lazy(() => import('./OTPVerify'));
const Home = lazy(() => import('./Home'));
const Contact = lazy(() => import('./Contact'));
const About = lazy(() => import('./About'));
const Calls = lazy(() => import('./Calls'));
const Settings = lazy(() => import('./Settings'));
const UpdateProfile = lazy(() => import('./UpdateProfile'));
const ErrorPage = lazy(() => import('./404'));

export {
  Landing,
  Login,
  Register,
  OTPVerify,
  Contact,
  About,
  Home,
  Calls,
  Settings,
  UpdateProfile,
  ErrorPage,
};
