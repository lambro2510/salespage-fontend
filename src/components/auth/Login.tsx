import { Button, Form, Input } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { apiRoutes } from '../../routes/api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { webRoutes } from '../../routes/web';
import { handleErrorResponse, setPageTitle } from '../../utils';
import { Auth } from '../../interfaces/models/auth';
import { defaultHttp } from '../../utils/http';
import { RoleType } from '../../interfaces/enum/RoleType';
import { ImGoogle, ImFacebook } from 'react-icons/im';
interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || -1;
  const auth = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setPageTitle('Đăng nhập');
  }, []);

  useEffect(() => {
    if (auth) {
      navigate(from, { replace: true });
    }
  }, [auth]);

  const onSubmit = (values: FormValues) => {
    setLoading(true);

    defaultHttp
      .post(apiRoutes.login, {
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        if (!response?.data?.error) {
          const auth: Auth = response?.data?.data;
          if (response?.data?.data?.role!= 'USER') {
            throw Error("Vui lòng đăng nhập trang quản trị viên để sử dụng");
          }
          dispatch(login(auth));
          navigate(-1)
        }
      })
      .catch((error) => {
        handleErrorResponse(error);
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-left text-opacity-30 tracking-wide">
        Admin Login
      </h1>
      <Form
        className="space-y-4 md:space-y-6"
        form={form}
        name="login"
        onFinish={onSubmit}
        layout={'vertical'}
        requiredMark={false}
      >
        <div>
          <Form.Item
            name="username"
            label={
              <p className="block text-sm font-medium text-gray-900">Tài khoản</p>
            }
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tài khoản',
              }
            ]}
          >
            <Input
              placeholder="lambro25102001"
              className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="password"
            label={
              <p className="block text-sm font-medium text-gray-900">
                Mật khẩu
              </p>
            }
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khấu',
              },
            ]}
          >
            <Input.Password
              placeholder="••••••••"
              visibilityToggle={false}
              className="bg-gray-50 text-gray-900 sm:text-sm py-1.5"
            />
          </Form.Item>
        </div>
        <div className="flex justify-between">
          <NavLink to={'/forget'} className="text-blue-400 hover:underline">
            Quên mật khẩu?
          </NavLink>
          <NavLink to={'/register'} className="text-green-400 hover:underline">
            Tạo tài khoản mới
          </NavLink>
        </div>

        <div className="text-center">
          <Button
            className="mt-4 bg-primary"
            block
            loading={loading}
            type="primary"
            size="large"
            htmlType={'submit'}
          >
            Đăng nhập
          </Button>
        </div>
        <div className="flex justify-around">
          <ImGoogle className="h-5 w-5 text-red-400 hover:text-red-500 cursor-pointer" />
          <ImFacebook className="h-5 w-5 text-blue-400 hover:text-blue-500 cursor-pointer" />
        </div>



      </Form>
    </Fragment>
  );
};

export default Login;
