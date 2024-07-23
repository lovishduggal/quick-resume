import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { UserButton } from '@clerk/clerk-react';

const Header = () => {
  const { user, isSignedIn } = useContext(UserContext);

  return (
    <div className="py-4 px-6 flex items-center justify-between">
      <img src="/logo-desktop.svg" width={200} height={200} alt="logo" />
      {user && isSignedIn ? (
        <div className="flex items-center gap-3">
          <Link to={'/dashboard'}>
            {' '}
            <Button variant={'outline'}>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={'/auth/log-in'}>
          {' '}
          <Button>Get Started - it&apos;s free!</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
