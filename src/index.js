/**
 * Import dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';

/**
 * Import main app component
 */
import App from './components/App';

/**
 * Inject some global styles
 */
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

/**
 * Render app
 */
ReactDOM.render(<App />, document.getElementById('root'));
