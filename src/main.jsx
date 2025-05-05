import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';

// Add performance measurement for development
if (process.env.NODE_ENV === 'development') {
  const reportWebVitals = async () => {
    const { onCLS, onFID, onLCP, onTTFB } = await import('web-vitals');
    onCLS(console.log);
    onFID(console.log);
    onLCP(console.log);
    onTTFB(console.log);
  };
  reportWebVitals();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);