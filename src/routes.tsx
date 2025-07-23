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
