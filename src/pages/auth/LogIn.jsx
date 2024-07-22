import { SignIn } from '@clerk/clerk-react';

const LogIn = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default LogIn;
