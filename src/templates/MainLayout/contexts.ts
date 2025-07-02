import { createContext } from 'react';
import type { BreadcrumbItem } from './types';

export type BreadcrumbContextType = {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
};

export const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined,
);
