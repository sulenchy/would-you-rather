import React from "react";
import PropTypes from "prop-types";
import { useSelector, connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { selectAuthedUser } from "../selectors";
import { handleResetUser } from "../actions/authedUser";

const defaultAvatarURL = "";

function Navbar({ dispatch }) {
  const authedUser = useSelector(selectAuthedUser);
  const history = useHistory();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(handleResetUser());
    history.push("/");
  };
  

  return (
    <div>
      <nav className="w-full text-center h-12 mb-20 flex justify-center border-b-4 border-green-600 items-center">
        <ul className="w-4/12">
          <NavLink activeClassName="focus:bg-green-600" className="inline mx-4 hover:bg-green-600" to="/home">Home</NavLink>
          { authedUser && <>
            <NavLink activeClassName="focus:bg-green-600" className="inline mx-4 hover:bg-green-600" to="/add">New Question</NavLink> 
            <NavLink activeClassName="focus:bg-green-600" className="inline mx-4 hover:bg-green-600" to="/leaderboard">Leader Board</NavLink>
          </>}
        </ul>
        {
          authedUser &&
          <section className="w-3/12">
            <h6 className="inline m-4">Hello, { authedUser && authedUser.name }</h6>
            <li className="inline m-4 hover:bg-green-600" onClick={ handleLogout }><img className="w-1/12 inline" src={ authedUser.avatarURL } /> Logout</li>
          </section>
        }
        
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Navbar);
