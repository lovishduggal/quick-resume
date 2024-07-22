import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ClerkProvider } from '@clerk/clerk-react';
import { neobrutalism } from '@clerk/themes';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: [neobrutalism],
      }}
      publishableKey={PUBLISHABLE_KEY}
    >
      <RouterProvider router={router}></RouterProvider>
    </ClerkProvider>
  </React.StrictMode>
);
