import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import Layout from "./layout";
import HomePage from "../Home";
import ActivitesPage from "../Activities";
import SignInPage from "../SignIn";
import AdminPage from "../Admin";

import { withAuthentication } from "../Session";

import "./app.css";
import "../Navigation/navigation.css";
import "../SignIn/signin.css";
import "../Footer/footer.css";
import "../Home/home.css";
import "../Activities/activities.css";
import "../Activities/singleActivity.css";
import "../Admin/admin.css";
import SingleActivityPage from "../Activities/singleActivityPage";

const App = () => (
  <Router>
    <div>
      <Layout>
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACTIVITIES} component={ActivitesPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path="/:url" component={SingleActivityPage} />
        </Switch>
      </Layout>
    </div>
  </Router>
);

export default withAuthentication(App);
