const React = require('react');
const ReactDom = require('react-dom');

// const App = require('./WordRelay');
import App from './shouldComponentUpdate';

ReactDom.render(<App />, document.querySelector('#root'));