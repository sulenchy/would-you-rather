import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { handleFetchUsers } from "../actions/users";
import { selectAuthedUser } from "../selectors";
import Login from "./Login";
import Navbar from "./Navbar";
import Home from "./Home";

function App(props) {
  const authedUser = useSelector(selectAuthedUser);
  useEffect(() => {
    const { dispatch } = props;
    dispatch(handleFetchUsers());
  }, [props]);

  return (
    <div className='col'>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/poll">
          <div>Polling</div>
        </PrivateRoute>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="*">
          <div className="text-center text-lg"><h1>Page not found!!</h1></div>
        </Route>
      </Switch>
    </div>
  );
}

App.propTypes ={
  dispatch: PropTypes.func
};

export default connect()(App);
