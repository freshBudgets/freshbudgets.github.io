import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import Reducer from './Reducers';

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, Reducer)
export const store = createStore(Reducer, applyMiddleware(thunk));
// export const persistor = persistStore(store);
