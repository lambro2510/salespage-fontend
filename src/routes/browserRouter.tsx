import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import ErrorPage from '../components/errorPage';
import Layout from '../components/layout';
import Redirect from '../components/layout/Redirect';
import NotFoundPage from '../components/notfoundPage';
import { webRoutes } from './web';
import loadable from '@loadable/component';
import ProgressBar from '../components/loader/progressBar';
import RequireAuth from './requireAuth';
import Login from '../components/auth/Login';
import LoginForm from '../components/auth/LoginForm';

const errorElement = <ErrorPage />;
const fallbackElement = <ProgressBar />;

const Home = loadable(() => import('../components/home'), {
  fallback: fallbackElement,
});
const Profile = loadable(() => import('../components/profile'), {
  fallback: fallbackElement,
});


const Register = loadable(() => import('../components/auth/Register'), {
  fallback: fallbackElement,
});
const Verify = loadable(() => import('../components/register/verify'), {
  fallback: fallbackElement,
});

const ProductDetailView = loadable(() => import('../components/product'), {
  fallback: fallbackElement,
});

const ListProduct = loadable(() => import('../components/products'), {
  fallback: fallbackElement,
});

const CartView = loadable(() => import('../components/cart'), {
  fallback: fallbackElement,
});
export const browserRouter = createBrowserRouter([
  {
    path: webRoutes.home,
    element: <Layout />,
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.home,
        element: <Home />,
        errorElement: errorElement,
      },
      {
        path: `${webRoutes.products}/:productId`,
        element: <ProductDetailView />,
        errorElement: errorElement,
      },
      {
        path: `${webRoutes.products}`,
        element: <ListProduct />,
        errorElement: errorElement,
      },
    ]
  },

  // auth routes
  {
    element: <AuthLayout />,
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.login,
        element: <LoginForm />,
      },
      {
        path: webRoutes.register,
        element: <Register />,
      },
      {
        path: `${webRoutes.register}/:username`,
        element: <Verify />,
      },
    ],
  },

  // protected routes
  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.profile,
        element: <Profile />,
        errorElement: errorElement,
        children: [
        ]
      },
      {
        path: webRoutes.cart,
        element: <CartView />,
        errorElement: errorElement,
        children: [
        ]
      },
    ],
  },

  // 404
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: errorElement,
  },
]);
