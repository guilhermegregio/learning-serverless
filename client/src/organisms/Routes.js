import React from "react"
import { Route, Switch } from "react-router-dom"
import Loadable from 'react-loadable'
import AuthenticatedRoute from "../molecules/AuthenticatedRoute"
import UnauthenticatedRoute from "../molecules/UnauthenticatedRoute"
import AppliedRoute from "../molecules/AppliedRoute"

const MyLoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <div>Loading...</div>
  }
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>
  }
  else {
    return null
  }
}

const AsyncHome = Loadable({ loader: () => import("./Home"), loading: MyLoadingComponent })
const AsyncLogin = Loadable({ loader: () => import("./Login"), loading: MyLoadingComponent })
const AsyncSignup = Loadable({ loader: () => import("./Signup"), loading: MyLoadingComponent })
const AsyncNewNote = Loadable({ loader: () => import("./NewNote"), loading: MyLoadingComponent })
const AsyncNotes = Loadable({ loader: () => import("./Notes"), loading: MyLoadingComponent })
const AsyncNotFound = Loadable({ loader: () => import("./NotFound"), loading: MyLoadingComponent })

const Routes = ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={AsyncHome} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={AsyncLogin} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={AsyncSignup} props={childProps} />
    <AuthenticatedRoute path="/notes/new" exact component={AsyncNewNote} props={childProps} />
    <AuthenticatedRoute path="/notes/:id" exact component={AsyncNotes} props={childProps} />
    <Route component={AsyncNotFound} />
  </Switch>
)

export default Routes
