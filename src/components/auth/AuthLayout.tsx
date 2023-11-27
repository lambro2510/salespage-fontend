import { Outlet } from 'react-router';
import loginBg from '../../assets/img/login-bg.png';

const AuthLayout = () => {
  return (
    <div className="relative">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
