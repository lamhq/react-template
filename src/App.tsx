import { useCallback } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';

import { AuthProvider, requireAuth } from './auth-state';
import SignInPage from './auth/pages/SignInPage';
import { HOME_ROUTE, SIGN_IN_ROUTE, navItems } from './routes';
import MainLayout from './templates/MainLayout';
import TodoListPage from './todos/pages/TodoListPage';

const ProtectedLayout = requireAuth(() => <MainLayout menuItems={navItems} />);

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Redirect unauthenticated users to sign-in, preserving the current path
  const handleUnauthenticated = useCallback(() => {
    const currentPath = location.pathname;
    if (currentPath !== SIGN_IN_ROUTE) {
      navigate(`${SIGN_IN_ROUTE}?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [location.pathname, navigate]);

  // After authentication, redirect to the intended page or home
  const handleAuthenticated = useCallback(() => {
    const redirectPath = searchParams.get('redirect');
    if (redirectPath) {
      searchParams.delete('redirect');
      setSearchParams(searchParams, { replace: true });
      navigate(redirectPath, { replace: true });
    } else {
      navigate(HOME_ROUTE, { replace: true });
    }
  }, [searchParams, setSearchParams, navigate]);

  return (
    <AuthProvider
      onUnauthenticated={handleUnauthenticated}
      onAuthenticated={handleAuthenticated}
    >
      <Routes>
        <Route path={SIGN_IN_ROUTE} element={<SignInPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path={HOME_ROUTE} element={<TodoListPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
