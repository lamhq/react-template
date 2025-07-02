import type { ReactNode } from 'react';
import { useState } from 'react';
import { BreadcrumbContext } from './contexts';
import type { BreadcrumbItem } from './types';

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}
