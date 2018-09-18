import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import HttpsRedirect from 'react-https-redirect';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Reducer from './Reducers';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, Reducer)
const store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store)

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
