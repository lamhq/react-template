import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from './routes';

import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { ConfirmProvider } from './confirm';
import { NotificationProvider } from './notification';
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
              <ConfirmProvider>
                <RouterProvider router={router} />
              </ConfirmProvider>
            </LayoutProvider>
          </RouterAuthProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </CssVarsProvider>
  </StrictMode>,
);
