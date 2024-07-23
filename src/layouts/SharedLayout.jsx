import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/custom/Header';

const SharedLayout = () => {
  const { user, isSignedIn } = useContext(UserContext);
  const path = window.location.pathname;

  if (path !== '/' && !user && !isSignedIn)
    return <Navigate to={'/auth/log-in'} replace={true} />;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default SharedLayout;
