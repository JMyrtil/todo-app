import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';
import SettingsProvider from './Context/Settings';
import LoginProvider from './Context/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </MantineProvider>
    </LoginProvider>
  </React.StrictMode>
);
