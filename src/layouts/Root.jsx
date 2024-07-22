import { Outlet } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useUser } from '@clerk/clerk-react';
import Spinner from '../components/custom/Spinner';

const Root = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <UserContext.Provider value={{ user, isSignedIn }}>
      <Outlet />
    </UserContext.Provider>
  );
};

export default Root;
