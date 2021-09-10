import React, { useEffect } from 'react';
import { Button } from 'reactstrap'
import { connect } from 'react-redux';
import { handleFetchUsers } from '../actions/users'

function App(props) {

  useEffect(() => {
    const { dispatch } = props;
    dispatch(handleFetchUsers());
  })

  return (
    <div>
      Would you rather... Things are getting started

      <br />
      <Button color="danger">try out</Button>
      
    </div>
  );
}

export default connect()(App);
