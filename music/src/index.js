import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { getEventNames } from './boostrap';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

// clean DOM after root component is unmounted
function cleanDOM() {
  // remove mounted React component from the DOM and clean up any of its event handlers and state
  ReactDOM.unmountComponentAtNode(rootElement);

  // remove this listener
  window.document.removeEventListener(getEventNames().MICRO_FRONTEND_DID_UNMOUNT, cleanDOM);
}

window.document.addEventListener(getEventNames().MICRO_FRONTEND_DID_UNMOUNT, cleanDOM);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
