import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

ReactDOM.render(
  <Routes history={hashHistory}/>,
  document.getElementById('root')
);
