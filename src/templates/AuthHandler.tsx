import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { ON_AUTH_REQUIRED, ON_AUTHENTICATED } from '../auth-state';
import { useNotification } from '../notification';
import { HOME_ROUTE, SIGN_IN_ROUTE } from '../routes';

/**
 * AuthHandlerProvider - Handles authentication flow and navigation logic
 *
 * This provider component handle different authentication events in the application.
 * - redirects unauthenticated users to sign-in page
 * - redirects users to their intended destination after authentication
 *
 * It should be rendered in the top level of the component tree to provide
 * authentication handling for all child components.
 *
 * @param children - Child components that need authentication handling
 */
export function AuthHandlerProvider({ children }: { children: React.ReactNode }) {
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();
  const location: { state?: { from: { pathname: string } } } = useLocation();
  const from = location.state?.from.pathname ?? HOME_ROUTE;

  // Redirect unauthenticated users to sign-in, preserving the current path
  useEffect(() => {
    const handleOnAuthRequire = () => {
      showError('You have to sign in to perform this action');
      void navigate(SIGN_IN_ROUTE, { state: { from: location }, replace: true });
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
      void navigate(from, { replace: true });
    };

    window.addEventListener(ON_AUTHENTICATED, handleAuthenticated);
    return () => {
      window.removeEventListener(ON_AUTHENTICATED, handleAuthenticated);
    };
  }, [from, navigate, showSuccess]);

  return children;
}

/**
 * A different version of AuthHandler component to use with React Router (data mode)
 *
 * Since RouterProvider doesn't accept children components, this component should
 * be used as the root element in the router configuration.
 *
 * @returns JSX element that provides auth handling for all child routes
 */
export default function AuthHandler() {
  return (
    <AuthHandlerProvider>
      <Outlet />
    </AuthHandlerProvider>
  );
}
