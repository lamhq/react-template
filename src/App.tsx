import { Route, Routes } from 'react-router';

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Home from './pages/Home';
import MainLayout, { type MenuItem } from './templates/MainLayout';

// Placeholder components for Dashboard and Orders
const Dashboard = () => <div>Dashboard</div>;
const Orders = () => <div>Orders</div>;

// Define menu items
const menuItems: MenuItem[] = [
  { path: '/', label: 'Home', icon: HomeRoundedIcon },
  { path: '/dashboard', label: 'Dashboard', icon: DashboardRoundedIcon },
  { path: '/orders', label: 'Orders', icon: ShoppingCartRoundedIcon },
];

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout menuItems={menuItems} />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}
