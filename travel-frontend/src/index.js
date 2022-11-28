import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import rootReducer, {rootSaga} from "./modules";
import {composeWithDevTools} from "redux-devtools-extension";
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

root.render(
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
);
