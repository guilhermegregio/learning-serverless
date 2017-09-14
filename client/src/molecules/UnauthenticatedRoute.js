import React from "react"
import { Route, Redirect } from "react-router-dom"

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&")

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i")
  const results = regex.exec(url)

  if (!results) {
    return '/'
  }

  if (!results[2]) {
    return '/'
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

const renderOrRedirect = (Component, cProps, redirect) => props => {
  if (!cProps.isAuthenticated) {
    return <Component {...props} {...cProps} />
  }

  return <Redirect to={redirect} />
}

const UnauthenticatedRoute = ({ component: C, props: cProps, ...rest }) => {
  const redirect = querystring("redirect")
  return (
    <Route {...rest} render={renderOrRedirect(C, cProps, redirect)} />
  )
}

export default UnauthenticatedRoute
