import { useCallback, useContext } from 'react';
import { BreadcrumbContext } from './contexts';
import type { BreadcrumbItem } from './types';

export function useBreadcrumbs(): BreadcrumbItem[] {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbProvider');
  }
  return context.breadcrumbs;
}

export function useSetBreadcrumbs() {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useSetBreadcrumbs must be used within a BreadcrumbProvider');
  }

  const setBreadcrumbsItems = useCallback(
    (items: BreadcrumbItem[]) => {
      context.setBreadcrumbs(items);
    },
    [context],
  );

  return setBreadcrumbsItems;
}
