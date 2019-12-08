import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';
// import RockScissorsPaper from "./RockScissorsPaper";
import RockScissorsPaper from "./RockScissorsPaper_Hooks";
const Hot = hot(RockScissorsPaper);


ReactDOM.render(<Hot />, document.querySelector('#root'));

