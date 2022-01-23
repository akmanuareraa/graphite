import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bulma/css/bulma.min.css';
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId="TaWaoLfm9m9uk9TtKIVl8CXEEQUbUY8CHJIvTvhx" serverUrl="https://jqeiowrpgarv.usemoralis.com:2053/server">
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


