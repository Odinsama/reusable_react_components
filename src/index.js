import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/highlight.js/styles/agate.css';
import registerServiceWorker from './registerServiceWorker';
import Docs from "./docs/Docs";

ReactDOM.render(<Docs />, document.getElementById('root'));
registerServiceWorker();
