import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { BrowserRouter } from 'react-router-dom';

import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import TestQDetail from './components/test/TestQDetail';

// const logMiddleware = store => next => action => {
//   next(action);
// } 

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();