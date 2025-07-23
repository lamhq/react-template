import { useCallback } from 'react';
import { useLocalStorage } from '../common/hooks';
import { ON_AUTHENTICATED } from './constants';
import { AuthContext, type AuthContextType } from './contexts';

export type AuthProviderProps<T> = {
  children: React.ReactNode;
  initialState?: T;
};

export default function AuthStateProvider<T>({
  children,
  initialState = undefined,
}: AuthProviderProps<T>) {
  const [user, setUser] = useLocalStorage<T | undefined>('user', initialState);

  const signIn: AuthContextType<T>['signIn'] = useCallback(
    (data) => {
      setUser(data.user);
      window.dispatchEvent(new CustomEvent(ON_AUTHENTICATED));
    },
    [setUser],
  );

  const signOut = useCallback(() => {
    setUser(undefined);
  }, [setUser]);

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
