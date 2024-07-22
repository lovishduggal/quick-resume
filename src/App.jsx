import { useUser } from '@clerk/clerk-react';
import './App.css';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from './components/custom/Spinner';

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  if (!isSignedIn) return <Navigate to={'/auth/log-in'} />;

  return <Outlet />;
}

export default App;
