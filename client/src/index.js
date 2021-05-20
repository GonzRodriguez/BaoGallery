import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApiContext } from "./context/ApiContext";
import * as api from "./API/API"



ReactDOM.render(
  <React.StrictMode>
    <ApiContext.Provider value={api}>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </ApiContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
