import React from 'react'
import ReactDom from 'react-dom/client'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);