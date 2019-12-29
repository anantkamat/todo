import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider as StoreProvider } from 'react-redux';
import store from './Redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistStore } from 'redux-persist';


const persistor = persistStore(store)

const AppData = () => (
  <StoreProvider store = {store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </StoreProvider>
)


ReactDOM.render(<AppData />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
