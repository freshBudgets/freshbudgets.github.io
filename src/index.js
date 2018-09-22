import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import HttpsRedirect from 'react-https-redirect';

import {store, persistor} from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HttpsRedirect>
        <App />
      </HttpsRedirect>
    </PersistGate>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
