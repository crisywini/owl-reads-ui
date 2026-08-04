import { createContext } from 'react';

// Kept in its own plain (non-component) file, separate from the provider
// component, so SelectedBookContext.jsx only exports a component - that's
// what keeps React Fast Refresh working during development.
export const SelectedBookContext = createContext(null);
