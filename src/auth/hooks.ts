import { useContext } from 'react';
import { AuthContext, type AuthContextType } from './contexts';

function useAuthContext<T>(): AuthContextType<T> {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider is missing in the React component tree');
  }
  return context;
}

export function useSignIn<T>(): AuthContextType<T>['signIn'] {
  return useAuthContext<T>().signIn;
}

export function useSignOut() {
  return useAuthContext().signOut;
}

export function useAuthUser<T>(): AuthContextType<T>['user'] {
  return useAuthContext<T>().user;
}

export function useIsAuthenticated() {
  return useAuthContext().isAuthenticated;
}
