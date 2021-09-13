import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { selectAuthedUser } from "../selectors";
import { handleResetUser } from "../actions/authedUser";

const defaultAvatarURL = "";

function Navbar({ dispatch }) {
  const [redirect, setRedirect] = useState(false);
  const authedUser = useSelector(selectAuthedUser);

  const handleLogout = (event) => {
    event.preventDefault();
    setRedirect(true);
    dispatch(handleResetUser());
  };

  useEffect(() => {
    console.log("redirect ===> ", redirect);
    if (redirect) {
      return <Redirect to="/hjhsf" />;
    }
    setRedirect(false);
  }, [redirect]);
  

  return (
    <div>
      <nav className="w-full h-12 mb-20 flex justify-center border-b-4 border-green-600 items-center">
        <ul className="w-4/12">
          <Link className="inline mx-4 hover:bg-green-600" to="/">Home</Link>
          { authedUser && <Link className="inline mx-4 hover:bg-green-600" to="/new">New Question</Link> }
          <Link className="inline mx-4 hover:bg-green-600" to="/leaderboard">Leader Board</Link>
        </ul>
        {
          authedUser &&
          <section className="w-3/12">
            <h6 className="inline m-4">Hello, { authedUser && authedUser.name }</h6>
            <li className="inline m-4 hover:bg-green-600" onClick={ handleLogout }><img className="inline" src={ authedUser.avatarURL && defaultAvatarURL } />Logout</li>
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
