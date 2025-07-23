import { createBrowserRouter } from 'react-router';
import { requireAuth } from './auth-state';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoadingFallback from './common/atoms/LoadingFallback';
import AuthHandler from './templates/AuthHandler';
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
 * Router configuration using React Router Data mode
 */
export const router = createBrowserRouter([
  {
    element: <AuthHandler />,
    children: [
      {
        path: SIGN_IN_ROUTE,
        hydrateFallbackElement: <LoadingFallback />,
        lazy: async () => {
          const module = await import('./auth/pages/SignInPage');
          const Component = module.default;
          return { Component };
        },
      },
      {
        element: <ProtectedLayout />,
        hydrateFallbackElement: <LoadingFallback />,
        children: [
          {
            path: HOME_ROUTE,
            lazy: async () => {
              const module = await import('./todos/pages/TodoListPage');
              const Component = module.default;
              return { Component };
            },
          },
        ],
      },
      {
        path: '*',
        lazy: async () => {
          const module = await import('./pages/NotFoundPage');
          const Component = module.default;
          return { Component };
        },
      },
    ],
  },
]);
