// authguard.tsx

import { useEffect } from 'react';

// next
import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/react'; // Assuming you don't need this line
import { useSelector } from 'store';

// types
import { GuardProps } from 'types/auth';
import Loader from 'components/Loader';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }: GuardProps) => {
  const router = useRouter();
  const loggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  // console.log('loggedIn', loggedIn);
  // const token = null;
  // console.log("token", token);

  useEffect(() => {
    if (!loggedIn) {
      router.push('/login');
    }
  }, [loggedIn, router]);

  // Uncomment the following lines if you want to check for session or loading status
  // const { data: session, status } = useSession();

  if (!loggedIn) return <Loader />;

  return children;
};

export default AuthGuard;
