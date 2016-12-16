import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, IndexRedirect } from "react-router";
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

import AddQuiz from "./pages/AddQuiz";
import ManageQuiz from "./pages/ManageQuiz";
import GameOverview from "./pages/GameOverview";
import PrebuiltQuiz from "./pages/PrebuiltQuiz";
import CarQuizGame from "./pages/CarQuizGame"
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import MyResults from "./pages/MyResults";
import AuthService from "./util/AuthService"


const app = document.getElementById('root');

const auth = new AuthService('iH7Hvxq7GkgxZEIVFK7Ntb5ySmT8jWdE', 'stefanr.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Homepage} />
      <Route path="/gameOverview" name="gameOverview" component={GameOverview}></Route>
      <Route path="/prebuiltQuiz" name="prebuiltQuiz" component={PrebuiltQuiz}></Route>
      <Route path="/carQuizGame" name="carQuizGame" component={CarQuizGame}></Route>
      <Route path="/addQuiz" name="addQuiz" component={AddQuiz} onEnter={requireAuth} ></Route>
      <Route path="/manageQuiz" name="manageQuiz" component={ManageQuiz} onEnter={requireAuth} ></Route>
      <Route path="/myResults" name="myResults" component={MyResults} onEnter={requireAuth} ></Route>
    </Route>
  </Router>,
app);

