import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';
function NonAuth() {
  const { user, isSignedIn } = useContext(UserContext);

  if (user && isSignedIn) return <Navigate to={'/'} />;

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default NonAuth;
