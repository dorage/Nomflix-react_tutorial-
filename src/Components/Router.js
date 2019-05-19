import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Header from './Header';
import Home from '../Routes/Home';
import Search from '../Routes/Search';
import TV from '../Routes/TV';
import Detail from '../Routes/Detail';

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route
          path="https://dorage.github.io/Nomflix-react_tutorial-/"
          exact
          component={Home}
        />
        <Route
          path="https://dorage.github.io/Nomflix-react_tutorial-/tv"
          exact
          component={TV}
        />
        <Route
          path="https://dorage.github.io/Nomflix-react_tutorial-/search"
          exact
          component={Search}
        />
        <Route
          path="https://dorage.github.io/Nomflix-react_tutorial-/movie/:id"
          component={Detail}
        />
        <Route
          path="https://dorage.github.io/Nomflix-react_tutorial-/tv/:id"
          component={Detail}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
