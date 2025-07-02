import { Route, Routes } from 'react-router';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { requireAuth } from './auth-state';
import SignInPage from './auth/pages/SignInPage';
import { SIGN_IN_ROUTE } from './routes';
import MainLayout, { type MenuItem } from './templates/MainLayout';
import TodoListPage from './todos/pages/TodoListPage';

// Sidebar menu items
const menuItems: MenuItem[] = [{ path: '/', label: 'Todos', icon: HomeRoundedIcon }];

// Protected layout
const Layout = requireAuth(() => <MainLayout menuItems={menuItems} />, {
  fallbackPath: SIGN_IN_ROUTE,
});

export default function App() {
  return (
    <Routes>
      <Route path={SIGN_IN_ROUTE} element={<SignInPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<TodoListPage />} />
      </Route>
    </Routes>
  );
}
