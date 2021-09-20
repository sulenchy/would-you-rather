import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { handleFetchUsers } from "../actions/users";
import { handleFetchQuestions } from "../actions/questions";
import Login from "./Login";
import Navbar from "./Navbar";
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import ViewPoll from "./ViewPoll";
import Leaderboard from "./LeaderBoard";
import NotFound from "./NotFound";

function App(props) {
  useEffect(() => {
    const { dispatch } = props;
    dispatch(handleFetchUsers());
    dispatch(handleFetchQuestions());
  }, [props]);

  return (
    <div className='col mx-auto'>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/add">
          <NewQuestion />
        </PrivateRoute>
        <PrivateRoute exact path="/leaderboard">
          <Leaderboard />
        </PrivateRoute>
        <PrivateRoute path="/questions/:id">
          <ViewPoll />
        </PrivateRoute>
        <Route path="/404">
          <NotFound />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

App.propTypes ={
  dispatch: PropTypes.func
};

export default connect()(App);
