import React from "react";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { selectAuthedUser } from "../selectors";

function PrivateRoute({ children, ...rest }) {
  const authedUser = useSelector(selectAuthedUser);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authedUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.object
};

export default PrivateRoute;