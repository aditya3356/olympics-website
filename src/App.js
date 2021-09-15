import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FanPage from './components/FanPage/FanPage';
import MedalPage from './components/MedalPage/MedalPage';
import { Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/fanpage" component={FanPage} />
        <Route path="/medals" component={MedalPage} />
      </Switch>
    );
  }
}

export default App;
