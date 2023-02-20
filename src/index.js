import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import CardContextProvider from './context/CardContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CardContextProvider>
    <Router>
    <App />
    </Router>
    </CardContextProvider>
  </React.StrictMode>
);


