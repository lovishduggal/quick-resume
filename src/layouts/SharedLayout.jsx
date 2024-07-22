import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const SharedLayout = () => {
  const { user, isSignedIn } = useContext(UserContext);

  if (!user && !isSignedIn)
    return <Navigate to={'/auth/log-in'} replace={true} />;

  return (
    <div>
      <div>Header</div>
      <Outlet />
    </div>
  );
};

export default SharedLayout;
