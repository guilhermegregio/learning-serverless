import React from "react"
import { Route, Redirect } from "react-router-dom"

const renderOrRedirect = (Component, cProps) => props => {
  if (cProps.isAuthenticated) {
    return <Component {...props} {...cProps} />
  }

  return <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`} />
}

const AuthenticatedRoute = ({ component: C, props: cProps, ...rest }) => (
  <Route {...rest} render={renderOrRedirect(C, cProps)} />
);

export default AuthenticatedRoute
