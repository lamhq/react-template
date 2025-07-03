import { useEffect, type JSX } from 'react';
import { AUTH_UNAUTHENTICATED_EVENT } from './constants';
import { useIsAuthenticated } from './hooks';

export function requireAuth<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>,
) {
  function ProtectedComponent(props: T) {
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
      if (!isAuthenticated) {
        // dispatch event after `useEffect` in parent component is executed
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent(AUTH_UNAUTHENTICATED_EVENT));
        });
      }
    }, [isAuthenticated]);

    return isAuthenticated ? <Component {...props} /> : null;
  }

  // set friendly component name in devtools
  ProtectedComponent.displayName = `requireAuth(${
    (Component.displayName ?? Component.name) || 'Component'
  })`;
  return ProtectedComponent;
}
