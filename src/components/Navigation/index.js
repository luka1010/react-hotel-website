import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

import { AuthUserContext } from "../Session";

import logo from "../../images-local/logo-white.png";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <nav className="my-navbar">
    <Link to="/">
      <img src={logo} className="my-navbar-logo" alt="logo" />
    </Link>
    <ul className="my-navbar-ul">
      <li className="my-navbar-li">
        <Link to={ROUTES.HOME}>HOME</Link>
      </li>
      <li className="my-navbar-li">
        <Link to={ROUTES.ACTIVITIES}>ACTIVITIES</Link>
      </li>
      <li className="my-navbar-li">
        <Link to={ROUTES.ADMIN}>ADMIN</Link>
      </li>
    </ul>
  </nav>
);

const NavigationNonAuth = () => (
  <nav className="my-navbar">
    <Link to="/">
      <img src={logo} className="my-navbar-logo" alt="logo" />
    </Link>
    <ul className="my-navbar-ul">
      <li className="my-navbar-li">
        <Link to={ROUTES.HOME}>HOME</Link>
      </li>
      <li className="my-navbar-li">
        <Link to={ROUTES.ACTIVITIES}>ACTIVITIES</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
