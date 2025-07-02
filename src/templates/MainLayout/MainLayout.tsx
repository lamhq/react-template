import { Outlet, useLocation } from 'react-router';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import Header from './Header';
import Sidebar from './Sidebar';
import { useBreadcrumbs } from './hooks';
import type { MenuItem } from './types';

export type MainLayoutProps = {
  menuItems: MenuItem[];
};

export default function MainLayout({ menuItems }: MainLayoutProps) {
  // Find current menu item for title
  const location = useLocation();
  const curMenuItem = menuItems.find((item) => item.path === location.pathname);

  // Get breadcrumbs items
  const bcItems = useBreadcrumbs();

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
        {bcItems.length > 0 && (
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
              {bcItems.map((item, index) => (
                <Link
                  key={index}
                  underline="hover"
                  color="neutral"
                  href={item.path}
                  sx={{ fontSize: 12, fontWeight: 500 }}
                >
                  {item.label}
                </Link>
              ))}
            </Breadcrumbs>
          </Box>
        )}

        {curMenuItem && (
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
              {curMenuItem.label}
            </Typography>
          </Box>
        )}

        <Outlet />
      </Box>
    </Box>
  );
}
