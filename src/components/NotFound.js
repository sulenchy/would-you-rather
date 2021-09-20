import React from "react";
import { NavLink } from "react-router-dom";


function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-red-600 text-3xl">404 - Page not found</h1>
      <p>Sorry, we could not retrieve this resource at this. Please check some another time.</p><p>See <NavLink to="/" className="text-blue-600">Home</NavLink></p>
    </div>
  );
}


export default NotFound;