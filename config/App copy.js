import React, { Component } from 'react';
import classes from './App.css';
import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import User from './components/User/User';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path = "/user" component = {User} />
            <Route path = "/" component = {Home} />
          </Switch>
        </Layout>
      </div>

    );
  }
}

export default App;
