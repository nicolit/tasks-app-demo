import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <SnackbarProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </SnackbarProvider>,
  document.getElementById('root')
);

// for offline / fast load - change to register
serviceWorker.unregister();