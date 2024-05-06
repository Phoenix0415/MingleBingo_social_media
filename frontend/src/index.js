import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import './index.css';

const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
            <Router>
                <App />
            </Router>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
