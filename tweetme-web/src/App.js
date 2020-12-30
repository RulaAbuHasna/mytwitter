import React from 'react';
import './App.css';
import { TweetForm } from './tweets';
import Login from './accounts/components/login'
import Signup from './accounts/components/resgister'
import MainPage from './tweets/components/twitter'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App(props) {
  const { data } = props;
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route exact path="/">
            <TweetForm data={data} />
          </Route>
          <Route exact path="/twitter/login">
            <Login />
          </Route>
          <Route exact path="/twitter/register">
            <Signup />
          </Route>
          <Route exact path="/twitter">
            <MainPage />
          </Route>
        </header>
      </div>
    </Router>
  );
}

export default App;
