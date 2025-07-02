import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App.tsx';
import { AuthProvider } from './auth/index.ts';
import { LayoutProvider } from './templates/MainLayout';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider>
      <CssBaseline />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <LayoutProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </LayoutProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </CssVarsProvider>
  </StrictMode>,
);
