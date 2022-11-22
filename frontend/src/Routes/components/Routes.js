import React, { lazy, Suspense } from "react";
import { Switch, Route, Router } from "react-router-dom";

const Video = lazy(() => import("../../Video"));
const Photo = lazy(() => import("../../Photo"));
const Register = lazy(() => import("../../Register"));
const Home = lazy(() => import("../../Home"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));

const Routes = () => (
  <Suspense
    fallback={
      <div className="route-loading">
        <h1>Loading...</h1>
      </div>
    }
  >
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/register" exact component={Register} />
      <PrivateRoute path="/photo" exact component={Photo} />
      <PrivateRoute path="/video" exact component={Video} />  
    </Switch>
  </Suspense>
);

export default Routes;
