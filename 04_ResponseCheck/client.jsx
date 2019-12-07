import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
// import ResponseCheck from './ResponseCheck'
import ResponseCheck from "./ResponseCheck_Hooks";
const Hot = hot(ResponseCheck);


ReactDOM.render(<Hot />, document.querySelector('#root'));

