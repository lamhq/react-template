import { createBrowserRouter } from 'react-router';
import { requireAuth } from './auth-state';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoadingFallback from './common/atoms/LoadingFallback';
import AuthHandlerProvider from './templates/AuthHandler';
import MainLayout from './templates/MainLayout';

/**
 * Home Route
 */
export const HOME_ROUTE = '/';

/**
 * Sign in Route
 */
export const SIGN_IN_ROUTE = '/sign-in';

/**
 * Sidebar menu items
 */
const navItems = [{ path: '/', label: 'Todos', icon: HomeRoundedIcon }];

/**
 * Protected layout that requires authentication
 */
const ProtectedLayout = requireAuth(() => <MainLayout menuItems={navItems} />);

/**
 * Creates a lazy loader function for React Router components with authentication handling.
 *
 * This utility function dynamically imports a component and wraps it with AuthHandlerProvider
 * to ensure proper authentication context is available throughout the component tree.
 *
 * @param path - The module path to dynamically import (should export a default React component)
 * @returns A lazy loader function compatible with React Router's `lazy` property
 *
 * @example
 * ```tsx
 * // Usage in router configuration
 * {
 *   path: '/dashboard',
 *   lazy: lazyImport('./pages/DashboardPage')
 * }
 * ```
 */
function lazyImport(path: string) {
  return async () => {
    const module = await import(path);
    const Component = module.default;
    return {
      Component: () => (
        <AuthHandlerProvider>
          <Component />
        </AuthHandlerProvider>
      ),
    };
  };
}

/**
 * Router configuration using React Router Data mode
 */
export const router = createBrowserRouter([
  {
    path: SIGN_IN_ROUTE,
    hydrateFallbackElement: <LoadingFallback />,
    lazy: lazyImport('./auth/pages/SignInPage'),
  },
  {
    element: <ProtectedLayout />,
    hydrateFallbackElement: <LoadingFallback />,
    children: [
      {
        path: HOME_ROUTE,
        lazy: lazyImport('./todos/pages/TodoListPage'),
      },
    ],
  },
  {
    path: '*',
    lazy: lazyImport('./pages/NotFoundPage'),
  },
]);
