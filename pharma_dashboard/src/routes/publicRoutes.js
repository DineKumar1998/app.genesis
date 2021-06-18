import React, { Component } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Login = React.lazy(() => import("../views/pages/login/Login"));

class PublicRoutes extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
          <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
          <Redirect to='/login' />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
} 

export default PublicRoutes;
