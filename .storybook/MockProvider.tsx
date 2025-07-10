import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { NotificationProvider } from '../src/notification';
import { LayoutProvider } from '../src/templates/MainLayout';
import RouterAuthProvider from '../src/templates/RouterAuthProvider';

const queryClient = new QueryClient();

export default function MockProvider({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <RouterAuthProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </RouterAuthProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </CssVarsProvider>
  );
}
