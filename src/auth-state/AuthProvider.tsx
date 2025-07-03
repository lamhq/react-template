import { useCallback, useEffect } from 'react';
import { useLocalStorage } from '../common/hooks';
import { useNotification } from '../notification';
import { AUTH_UNAUTHENTICATED_EVENT } from './constants';
import { AuthContext, type AuthContextType } from './contexts';

export type AuthProviderProps<T> = {
  children: React.ReactNode;
  initialState?: T;
  onUnauthenticated?: () => void;
  onAuthenticated?: () => void;
};

export default function AuthProvider<T>({
  children,
  initialState = undefined,
  onUnauthenticated,
  onAuthenticated,
}: AuthProviderProps<T>) {
  const [user, setUser] = useLocalStorage<T | undefined>('user', initialState);
  const { showError } = useNotification();

  const signIn: AuthContextType<T>['signIn'] = useCallback(
    (data) => {
      setUser(data.user);
      onAuthenticated?.();
    },
    [setUser, onAuthenticated],
  );

  const signOut = useCallback(() => {
    setUser(undefined);
  }, [setUser]);

  useEffect(() => {
    const handleUnauthenEvent = () => {
      if (user) {
        // user get unauthenticated error when calling an api
        showError('Your session has expired');
      } else {
        // user is not logged in and access a protected page
        showError('You have to sign in to perform this action');
      }
      onUnauthenticated?.();
    };

    window.addEventListener(AUTH_UNAUTHENTICATED_EVENT, handleUnauthenEvent);

    return () => {
      window.removeEventListener(AUTH_UNAUTHENTICATED_EVENT, handleUnauthenEvent);
    };
  }, [user, onUnauthenticated, showError]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
