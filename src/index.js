import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Publisher from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Publisher />, document.getElementById('root'));
registerServiceWorker();
