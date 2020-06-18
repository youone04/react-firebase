import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer';
//store redux
// applyMiddleware berfungsi sebaga fungsi yang menangani asyncronus
// strore ini akan di import di halaman config/redux/index.js
export const store = createStore(reducer, applyMiddleware(thunk));
// export const store = createStore(reducer);
