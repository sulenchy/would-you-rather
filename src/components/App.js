import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { handleFetchUsers } from "../actions/users";
import { selectAuthedUser } from "../selectors";
import Login from "./Login";
import Navbar from "./Navbar";
import Home from "./Home";
import NewQuestion from "./NewQuestion";

function App(props) {
  const authedUser = useSelector(selectAuthedUser);
  useEffect(() => {
    const { dispatch } = props;
    dispatch(handleFetchUsers());
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
          <div>Leaderboard Page</div>
        </PrivateRoute>
        <PrivateRoute path="/poll/:id">
          <div>Polling</div>
        </PrivateRoute>
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
