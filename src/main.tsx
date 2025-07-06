import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { NotificationProvider } from './notification';
import { router } from './routes';
import { LayoutProvider } from './templates/MainLayout';
import RouterAuthProvider from './templates/RouterAuthProvider';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <RouterAuthProvider>
            <LayoutProvider>
              <RouterProvider router={router} />
            </LayoutProvider>
          </RouterAuthProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </CssVarsProvider>
  </StrictMode>,
);
