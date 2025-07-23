import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { ON_AUTH_REQUIRED, ON_AUTHENTICATED } from '../auth-state';
import { useNotification } from '../notification';
import { HOME_ROUTE, SIGN_IN_ROUTE } from '../routes';

function AuthHandlerProvider({ children }: { children: React.ReactNode }) {
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || HOME_ROUTE;

  // Redirect unauthenticated users to sign-in, preserving the current path
  useEffect(() => {
    const handleOnAuthRequire = () => {
      showError('You have to sign in to perform this action');
      navigate(SIGN_IN_ROUTE, { state: { from: location }, replace: true });
    };

    window.addEventListener(ON_AUTH_REQUIRED, handleOnAuthRequire);
    return () => {
      window.removeEventListener(ON_AUTH_REQUIRED, handleOnAuthRequire);
    };
  }, [showError, location, navigate]);

  // After authentication, redirect to the intended page or home
  useEffect(() => {
    const handleAuthenticated = () => {
      showSuccess('Successfully signed in!');
      navigate(from, { replace: true });
    };

    window.addEventListener(ON_AUTHENTICATED, handleAuthenticated);
    return () => {
      window.removeEventListener(ON_AUTHENTICATED, handleAuthenticated);
    };
  }, [from, navigate, showSuccess]);

  return children;
}

export default function AuthHandler() {
  return (
    <AuthHandlerProvider>
      <Outlet />
    </AuthHandlerProvider>
  );
}
