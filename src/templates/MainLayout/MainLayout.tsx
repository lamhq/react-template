import { Outlet, useLocation } from 'react-router';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import Header from './Header';
import Sidebar from './Sidebar';
import type { MenuItem } from './types';

export type MainLayoutProps = {
  menuItems: MenuItem[];
};

export default function MainLayout({ menuItems }: MainLayoutProps) {
  const location = useLocation();

  // Find current menu item for breadcrumbs and title
  const currentMenuItem =
    menuItems.find((item) => item.path === location.pathname) || menuItems[0];

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Header />
      <Sidebar menuItems={menuItems} />

      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="small" />}
            sx={{ pl: 0 }}
          >
            <Link underline="none" color="neutral" href="/" aria-label="Home">
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href={currentMenuItem.path}
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              {currentMenuItem.label}
            </Link>
          </Breadcrumbs>
        </Box>

        <Box
          sx={{
            display: 'flex',
            mb: 1,
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography level="h2" component="h1">
            {currentMenuItem.label}
          </Typography>
        </Box>

        <Outlet />
      </Box>
    </Box>
  );
}
