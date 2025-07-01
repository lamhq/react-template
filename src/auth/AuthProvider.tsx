import { useCallback, useEffect } from 'react';
import { useLocalStorage } from '../common/hooks';
import { AuthContext, type AuthContextType } from './contexts';

export type AuthProviderProps<T> = {
  children: React.ReactNode;
  initialState?: T;
};

export default function AuthProvider<T>({
  children,
  initialState = undefined,
}: AuthProviderProps<T>) {
  const [user, setUser] = useLocalStorage<T | undefined>('user', initialState);

  const signIn: AuthContextType<T>['signIn'] = useCallback(
    (data) => {
      setUser(data.user);
    },
    [setUser],
  );

  const signOut = useCallback(() => {
    setUser(undefined);
  }, [setUser]);

  useEffect(() => {
    // auto sign out when signout event is triggered
    window.addEventListener('auth:signout', signOut);
    return () => {
      window.removeEventListener('auth:signout', signOut);
    };
  }, [signOut]);

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
