import { createBrowserRouter } from 'react-router';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { requireAuth } from './auth-state';
import LoadingFallback from './common/molecules/LoadingFallback';
import MainLayout from './templates/MainLayout';

/**
 * Home
 */
export const HOME_ROUTE = '/';

/**
 * Sign in
 */
export const SIGN_IN_ROUTE = '/sign-in';

/**
 * Sidebar menu items
 */
const navItems = [{ path: '/', label: 'Todos', icon: HomeRoundedIcon }];

const ProtectedLayout = requireAuth(() => <MainLayout menuItems={navItems} />);

/**
 * Router configuration using React Router Data mode
 */
export const router = createBrowserRouter([
  {
    path: SIGN_IN_ROUTE,
    hydrateFallbackElement: <LoadingFallback />, // fix warning
    lazy: async () => {
      const Component = await import('./auth/pages/SignInPage');
      return { Component: Component.default };
    },
  },
  {
    element: <ProtectedLayout />,
    hydrateFallbackElement: <LoadingFallback />,
    children: [
      {
        path: HOME_ROUTE,
        lazy: async () => {
          const Component = await import('./todos/pages/TodoListPage');
          return { Component: Component.default };
        },
      },
    ],
  },
  {
    path: '*',
    lazy: async () => {
      const Component = await import('./pages/NotFoundPage');
      return { Component: Component.default };
    },
  },
]);
