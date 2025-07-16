// Import custom matchers provided by jest-dom
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

configure({
  // Disable automatic DOM dump for cleaner error messages
  getElementError: (message: string | null) => {
    const error = new Error(message ?? 'Element not found');
    error.name = 'TestingLibraryElementError';
    error.stack = undefined;
    return error;
  },
});
