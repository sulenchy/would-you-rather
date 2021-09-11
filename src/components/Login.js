import React from 'react';
import { connect } from 'react-redux';
import { selectUsersWithMinInfo } from '../selectors/users';


function Login(props) {
  return <div>login</div>
}

function mapStateToProps(state) {
  return {
      loginUsers: selectUsersWithMinInfo(state),
  }
}

export default connect(mapStateToProps)(Login);