import React from 'react';
import { Router, Route } from 'react-router';
import App from './components/App';
import About from './components/About';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={About} />
    <Route path="/search" component={About} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
