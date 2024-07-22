import { createBrowserRouter } from 'react-router-dom';
import LogIn from './pages/auth/LogIn';
import App from './App';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <h1>Home</h1>,
      },
    ],
  },
  {
    path: '/auth/log-in',
    element: <LogIn />,
  },
];
const router = createBrowserRouter(routes);

export default router;
