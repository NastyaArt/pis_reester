import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {createEpicMiddleware} from 'redux-observable';

import './index.css';
import App from './components/App.container';
import {rootEpic, rootReducer} from './redux/modules';
import {connect as wsConnect} from './redux/modules/ws';

import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-table/react-table.css";


let store = createStore(rootReducer, applyMiddleware(createEpicMiddleware(rootEpic)));

wsConnect(store);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
