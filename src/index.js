import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux' //keeps track of thre store or the global state of the variables in the frontend
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk"
import {reducer} from './Redux/reducers.js' 

import App from './App';

export const store = createStore(reducer, compose(applyMiddleware(thunk))) // this is the store/global state of varibales being initialized

ReactDOM.render(<Provider store = {store}> <App /> </Provider>, document.getElementById('root'));//we wrapped out ap component in a provider which has the global state or the store of variables


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

