import { createBrowserRouter } from 'react-router-dom';
import LogIn from './pages/auth/LogIn';
import Root from './layouts/Root';
import NonAuth from './layouts/NonAuth';
import SharedLayout from './layouts/SharedLayout';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';

const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <SharedLayout />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
        ],
      },
      {
        path: '/auth',
        element: <NonAuth />,
        children: [{ path: 'log-in', element: <LogIn /> }],
      },
    ],
  },
];
const router = createBrowserRouter(routes);

export default router;
