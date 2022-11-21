import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import { UserAuthContextProvider } from './Context/UserAuthContext';
import { MainContextProvider } from './Context/MainContext';
import { FirebaseContextProvider } from './Context/FirebaseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserAuthContextProvider>
        <MainContextProvider>
          <FirebaseContextProvider>
          <App />
          </FirebaseContextProvider>
        </MainContextProvider>
      </UserAuthContextProvider>
    </Router>
  </React.StrictMode>
);
