import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap'
import { connect } from 'react-redux';
import { handleFetchUsers } from '../actions/users'
import Login from "./Login";

function App(props) {
  useEffect(() => {
    const { dispatch } = props;
    dispatch(handleFetchUsers());
  }, [props])

  return (
    <div>
      Would you rather... Things are getting started
      <br />
      <Button color="danger">try out</Button>
      <Login />
    </div>
  );
}

export default connect()(App);
