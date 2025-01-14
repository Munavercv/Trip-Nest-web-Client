import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/store';
import ScrollToHash from './components/ScrollToHash';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToHash />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode >
);