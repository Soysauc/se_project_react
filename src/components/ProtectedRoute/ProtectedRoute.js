import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, children, ...props }) {
  return (
    <Route {...props}>{isLoggedIn ? children : <Redirect to={'/'} />}</Route>
  );
}

export default ProtectedRoute;
//Protect the /profile route by creating a
// wrapper component that redirects unauthorized users to the main page.
