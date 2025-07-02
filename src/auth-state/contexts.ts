import { createContext } from 'react';

export type AuthContextType<T> = {
  readonly user?: T;
  readonly isAuthenticated: boolean;
  readonly signIn: (data: { user: T }) => void;
  readonly signOut: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthContext = createContext<AuthContextType<any> | undefined>(
  undefined,
);
