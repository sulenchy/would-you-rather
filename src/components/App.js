import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect, useSelector } from "react-redux";
import { Route } from "react-router-dom";
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
      <Route exact path="/">
        { authedUser ? <Home />  : <Login /> }
      </Route>
    </div>
  );
}

App.propTypes ={
  dispatch: PropTypes.func
};


export default connect()(App);
