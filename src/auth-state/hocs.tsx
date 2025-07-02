import type { JSX } from 'react';
import { Navigate } from 'react-router';
import { useIsAuthenticated } from './hooks';

export function requireAuth<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>,
  options: {
    fallbackPath?: string;
  } = {},
) {
  if (options.fallbackPath === undefined) {
    throw new Error('fallbackPath is required in requireAuth');
  }
  const signInRoute = options.fallbackPath;

  function ProtectedComponent(props: T) {
    const isAuthenticated = useIsAuthenticated();
    if (!isAuthenticated) {
      return <Navigate to={signInRoute} />;
    }
    return <Component {...props} />;
  }

  // set friendly component name in devtools
  ProtectedComponent.displayName = `requireAuth(${
    (Component.displayName ?? Component.name) || 'Component'
  })`;
  return ProtectedComponent;
}
