import { useCallback } from 'react';
import { AuthProvider } from '../../auth-state';
import { HOME_ROUTE, SIGN_IN_ROUTE } from '../../routes';

export type RouterAuthProviderProps = {
  children: React.ReactNode;
};

export default function RouterAuthProvider({ children }: RouterAuthProviderProps) {
  // Redirect unauthenticated users to sign-in, preserving the current path
  const handleUnauthenticated = useCallback(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== SIGN_IN_ROUTE) {
      const redirectUrl = `${SIGN_IN_ROUTE}?redirect=${encodeURIComponent(currentPath)}`;
      window.location.href = redirectUrl;
    }
  }, []);

  // After authentication, redirect to the intended page or home
  const handleAuthenticated = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('redirect');

    if (redirectPath) {
      // Remove the redirect parameter from the URL
      urlParams.delete('redirect');
      const newSearch = urlParams.toString();
      const newUrl = newSearch ? `${redirectPath}?${newSearch}` : redirectPath;
      window.location.href = newUrl;
    } else {
      window.location.href = HOME_ROUTE;
    }
  }, []);

  return (
    <AuthProvider
      onUnauthenticated={handleUnauthenticated}
      onAuthenticated={handleAuthenticated}
    >
      {children}
    </AuthProvider>
  );
}
