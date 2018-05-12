import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {HashRouter as Router} from 'react-router-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './redux/store';
import ScrollToTop from './components/ScrollToTopComponent';

ReactDOM.render(
  <Router>
    <ScrollToTop>
      <Provider store={store}>
        <App />
      </Provider>
    </ScrollToTop>
  </Router>,
  document.getElementById('root') as HTMLElement
);
