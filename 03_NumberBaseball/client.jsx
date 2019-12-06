import React from 'react';
import ReactDOM from 'react-dom';

import NumberBaseball from './NumberBaseball';
// import NumberBaseball from './NumberBaseball_Hooks';
import {hot} from 'react-hot-loader/root';

const Hot = hot(NumberBaseball);

ReactDOM.render(<Hot />, document.querySelector('#root'));

