import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { handleFetchUsers } from "../actions/users";
import Login from "./Login";
import Navbar from "./Navbar";

function App(props) {
  useEffect(() => {
    const { dispatch } = props;
    dispatch(handleFetchUsers());
  }, [props]);

  return (
    <div className='col'>
      <Navbar />
      <Login />
    </div>
  );
}

App.propTypes ={
  dispatch: PropTypes.func
};



export default connect()(App);
