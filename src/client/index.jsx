/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDom from 'react-dom';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@chakra-ui/core';
import {
  LoginForm,
  LoggedIn,
  About,
  LandingPage,
  CreateGame,
  LoadingGame,
  WaitingRoom,
  JoinGame,
  GameOver,
} from './components';
import store from './store';
import GamePage from './components/gamePage';

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <HashRouter>
        <Switch>
          <Route exact path="/About" component={About} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/account" component={LoggedIn} />
          <Route exact path="/create" component={CreateGame} />
          <Route exact path="/loading-game" component={LoadingGame} />
          <Route exact path="/game/:id" component={GamePage} />
          <Route exact path="/join" component={JoinGame} />
          <Route exact path="/waiting/:id" component={WaitingRoom} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/game-over" component={GameOver} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </ThemeProvider>
  </Provider>
);

const app = document.querySelector('#app');

ReactDom.render(<App />, app);
