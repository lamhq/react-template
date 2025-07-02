import { Route, Routes } from 'react-router';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { requireAuth } from './auth';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import { SIGN_IN_ROUTE } from './routes';
import MainLayout, { type MenuItem } from './templates/MainLayout';

// Placeholder components for Dashboard and Orders
const Dashboard = () => <div>Dashboard</div>;
const Orders = () => <div>Orders</div>;

// Sidebar menu items
const menuItems: MenuItem[] = [
  { path: '/', label: 'Home', icon: HomeRoundedIcon },
  { path: '/dashboard', label: 'Dashboard', icon: DashboardRoundedIcon },
  { path: '/orders', label: 'Orders', icon: ShoppingCartRoundedIcon },
];

// Protected layout
const Layout = requireAuth(() => <MainLayout menuItems={menuItems} />, {
  fallbackPath: SIGN_IN_ROUTE,
});

export default function App() {
  return (
    <Routes>
      <Route path={SIGN_IN_ROUTE} element={<SignInPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}
