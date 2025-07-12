import { createContext } from 'react';
import type { ConfirmFn } from '../types';

export default createContext<ConfirmFn | undefined>(undefined);
