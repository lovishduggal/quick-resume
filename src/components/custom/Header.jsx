import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { UserButton } from '@clerk/clerk-react';

const Header = () => {
  const { user, isSignedIn } = useContext(UserContext);

  return (
    <div className="max-w-screen-lg lg:m-auto py-4 px-6 flex items-center justify-between">
      <h1 className="text-3xl font-semibold">
        <span className="text-primary font-bold">Q</span>
        <span>uick Resume</span>
      </h1>
      {user && isSignedIn ? (
        <div className="flex items-center gap-5">
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
