import React, { Component } from 'react';

import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import Layout from './components/Layout';
import Home from './components/Home';
import Error from './components/Error';
import MenuExample from './components/Menu';
import Market from './components/Market';
import AddCar from './components/AddCar';
import LoginHandler from './util/LoginHandler';

import './assets/css/custom.css';
import 'semantic-ui-css/semantic.min.css';

var util = require('./util/Util');
var user = util.user;

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BrowserRouter>
            <div>
              <MenuExample />
              <Switch>
                <Route path="/Login" component={LoginHandler} exact />
                <PrivateRoute path="/" exact component={AddCar} />
                <PrivateRoute path="/market" exact component={Market} />
                <Route component={Error} />
              </Switch>
            </div>
          </BrowserRouter>
        </Layout>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    user.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/Login' />
  )} />
);

export default App;
