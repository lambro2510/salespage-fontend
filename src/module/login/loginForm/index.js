import * as React from 'react';

import LoginWithUsername from './loginWithUsername';
import './style.scss';

const LoginForm = ({ setForm }) => {

  return (
    <LoginWithUsername setForm={setForm}/>
  );
};

export default LoginForm;
