import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { selectUsersWithMinInfo } from "../selectors";
import imgReact from "../images/reactjs.jpeg";
import { handleSetUser } from "../actions/authedUser";


function Login({ users, dispatch }) {
  const [userId, setUserId] = useState("");

  const handlChange = (event) => {
    event.preventDefault();
    const{ target: { value } } = event;
    setUserId(value);
  };

  const handleSubmit = event => {  
    event.preventDefault();  
    dispatch(handleSetUser(users[userId]));
  };

  return (
    <div className="flex flex-col mx-auto rounded-xl shadow-md space-y-2 items-center w-6/12">
      <div className="flex flex-col items-center bg-gray-200 w-full">
        <h3 className="font-bold">Welcome to the Would You Rather App!</h3>
        <p>Please sign in to continue</p>
      </div>
      <div className="flex flex-col items-center w-full">
        <img className="w-2/5 block mx-auto h-44 rounded-full sm:mx-0 sm:flex-shrink-0" src={ imgReact } alt="Woman's Face" />
      </div>
      <div className="flex flex-col items-center w-full px-5">
        <h3>Sign in</h3>

        <div className="w-full space-y-0.5">
          <form onSubmit={ handleSubmit }>
            <select value={ userId } onChange={ (event) => handlChange(event) } className="w-full border-gray-200 border-2 h-12 px-5">
              <option>Select a user</option>
              {
                Object.keys(users).map(id => <option key={ id } value={ users[id].id }>{ users[id].name }</option>)
              }
            </select>
            <button type="submit" className="w-full my-2 py-3 text-white rounded-md  bg-green-800" disabled={ userId === "" }>Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  users: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    users: selectUsersWithMinInfo(state),
  };
}

export default connect(mapStateToProps)(Login);
